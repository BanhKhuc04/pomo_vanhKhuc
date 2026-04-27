import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import useTimer from '../hooks/useTimer'
import useTheme from '../hooks/useTheme'
import useSound from '../hooks/useSound'
import useStreak from '../hooks/useStreak'
import useAchievements from '../hooks/useAchievements'
import {
  MODES, DEFAULT_SETTINGS, DEFAULT_STATS, STORAGE_KEYS,
  SESSIONS_BEFORE_LONG, GARDEN_SIZE, PLANT_STAGES
} from '../data/constants'
import { todayKey, notify, requestNotificationPermission, formatTime } from '../utils/helpers'
import { normalizeCharacterConfig } from '../data/characterOptions'

const PomoContext = createContext(null)

export const usePomo = () => {
  const ctx = useContext(PomoContext)
  if (!ctx) throw new Error('usePomo must be used within PomoProvider')
  return ctx
}

const initialGarden = () => ({
  date: todayKey(),
  plots: Array(GARDEN_SIZE).fill(PLANT_STAGES.EMPTY)
})

export function PomoProvider({ children }) {
  const [settings, setSettings] = useLocalStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS)
  const [stats, setStats] = useLocalStorage(STORAGE_KEYS.STATS, DEFAULT_STATS)
  const [garden, setGarden] = useLocalStorage(STORAGE_KEYS.GARDEN, initialGarden())
  const [mode, setMode] = useState(MODES.FOCUS)
  const [completedFocusInCycle, setCompletedFocusInCycle] = useState(0)
  const [muted, setMuted] = useState(false)
  const [toasts, setToasts] = useState([])

  const theme = useTheme(settings.autoDarkMode)
  const sound = useSound({
    musicVolume: settings.musicVolume,
    sfxVolume: settings.sfxVolume,
    muted
  })
  const streakHook = useStreak()
  const achievementsHook = useAchievements()

  // Reset stats / garden if day changed
  useEffect(() => {
    const today = todayKey()
    if (stats.lastDate !== today) {
      setStats(prev => ({
        ...prev,
        todayPomos: 0,
        todayMinutes: 0,
        lastDate: today
      }))
    }
    if (garden.date !== today) {
      setGarden(initialGarden())
    } else if (garden.plots && garden.plots.length !== GARDEN_SIZE) {
      // Migrate old garden (e.g. length 8) to new GARDEN_SIZE (19)
      setGarden(prev => {
        const newPlots = Array(GARDEN_SIZE).fill(PLANT_STAGES.EMPTY)
        for (let i = 0; i < Math.min(prev.plots.length, GARDEN_SIZE); i++) {
          newPlots[i] = prev.plots[i]
        }
        return { ...prev, plots: newPlots }
      })
    }
    streakHook.checkExpiry()
    requestNotificationPermission()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [tasks, setTasks] = useLocalStorage(STORAGE_KEYS.TASKS || 'pomo_tasks', [])
  const [activeTaskId, setActiveTaskId] = useState(null)
  const [dailyStats, setDailyStats] = useLocalStorage('pomo_daily_stats', {})
  const [characterConfigRaw, setCharacterConfigRaw] = useLocalStorage('pomo_character', null)
  const [sessionJustCompleted, setSessionJustCompleted] = useState(false)

  // Normalize tasks on load
  useEffect(() => {
    if (tasks.length > 0) {
      const needsUpdate = tasks.some(t => t.pomoCount === undefined)
      if (needsUpdate) {
        setTasks(prev => prev.map(t => ({
          ...t,
          pomoCount: t.pomoCount || 0,
          createdAt: t.createdAt || new Date().toISOString()
        })))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Compute timer duration in seconds for current mode
  const currentDurationSec = (settings.durations[mode] || 25) * 60

  // Toast helper
  const pushToast = useCallback((toast) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, ...toast }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, toast.duration || 3500)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  // Determine next mode
  const getNextMode = useCallback((finishedMode, focusInCycle) => {
    if (finishedMode === MODES.FOCUS) {
      const newCount = focusInCycle + 1
      if (newCount >= SESSIONS_BEFORE_LONG) return MODES.LONG_BREAK
      return MODES.SHORT_BREAK
    }
    return MODES.FOCUS
  }, [])

  // Handle session completion
  const handleComplete = useCallback(() => {
    const finishedMode = mode
    sound.stop('LOFI_BG')
    sound.stop('TICK')
    sound.play('BELL')

    if (finishedMode === MODES.FOCUS) {
      const focusMinutes = settings.durations[MODES.FOCUS] || 25
      const newTotal = stats.totalPomos + 1
      const newToday = stats.todayPomos + 1
      const newMinutes = stats.todayMinutes + focusMinutes

      setStats({
        totalPomos: newTotal,
        todayPomos: newToday,
        todayMinutes: newMinutes,
        lastDate: todayKey()
      })

      // Grow garden
      setGarden(prev => {
        const today = todayKey()
        const plots = prev.date === today ? [...prev.plots] : Array(GARDEN_SIZE).fill(PLANT_STAGES.EMPTY)
        const emptyIdx = plots.findIndex(p => p === PLANT_STAGES.EMPTY)
        if (emptyIdx !== -1) {
          plots[emptyIdx] = PLANT_STAGES.BLOOM
        } else {
          // Already full - grow random sprout into bloom (no-op since all bloomed)
        }
        return { date: today, plots }
      })

      // Increment pomoCount for active task
      if (activeTaskId) {
        setTasks(prev => prev.map(t => 
          t.id === activeTaskId ? { ...t, pomoCount: (t.pomoCount || 0) + 1 } : t
        ))
      }

      // Trigger celebrate animation (auto-clears after 2.5s)
      setSessionJustCompleted(true)
      setTimeout(() => setSessionJustCompleted(false), 2500)

      // Record daily stats
      setDailyStats(prev => {
        const today = todayKey()
        const current = prev[today] || { pomos: 0, minutes: 0, completedTasks: 0 }
        return {
          ...prev,
          [today]: {
            ...current,
            pomos: current.pomos + 1,
            minutes: current.minutes + focusMinutes
          }
        }
      })

      // Update streak
      streakHook.recordStudy()

      // Check achievements
      const hour = new Date().getHours()
      const newlyUnlocked = achievementsHook.checkAchievements({
        totalPomos: newTotal,
        todayPomos: newToday,
        streak: streakHook.streak.count + (streakHook.streak.lastDate === todayKey() ? 0 : 1),
        hour
      })
      newlyUnlocked.forEach(a => {
        sound.play('ACHIEVEMENT')
        pushToast({
          type: 'achievement',
          title: 'Achievement Unlocked!',
          message: `${a.emoji} ${a.name}`,
          duration: 4500
        })
      })

      const next = getNextMode(MODES.FOCUS, completedFocusInCycle)
      setCompletedFocusInCycle(prev => {
        const c = prev + 1
        return c >= SESSIONS_BEFORE_LONG ? 0 : c
      })

      pushToast({
        type: 'success',
        title: 'Focus Complete!',
        message: `Time for a ${next === MODES.LONG_BREAK ? 'long' : 'short'} break 🌿`
      })

      if (settings.notificationsEnabled) {
        notify('🍅 Focus session complete!', `Take a ${next === MODES.LONG_BREAK ? 'long' : 'short'} break.`)
      }

      setMode(next)
    } else {
      // Break finished
      pushToast({
        type: 'info',
        title: 'Break Over!',
        message: 'Ready to focus again? 💪'
      })
      if (settings.notificationsEnabled) {
        notify('☕ Break over!', 'Time to focus again.')
      }
      setMode(MODES.FOCUS)
    }
  }, [mode, settings, stats, sound, completedFocusInCycle, getNextMode, setStats, setGarden, streakHook, achievementsHook, pushToast, activeTaskId, setTasks, setDailyStats])

  // Tick handler (optional tick sound)
  const handleTick = useCallback((secondsLeft) => {
    if (settings.tickEnabled && mode === MODES.FOCUS) {
      sound.play('TICK')
    }
    // Update tab title
    document.title = `${formatTime(secondsLeft)} • ${mode === MODES.FOCUS ? '🍅' : mode === MODES.SHORT_BREAK ? '☕' : '😴'} POMO TIME`
  }, [settings.tickEnabled, mode, sound])

  const timer = useTimer(currentDurationSec, handleComplete, handleTick)

  // Reset title on stop
  useEffect(() => {
    if (!timer.isRunning) {
      document.title = '🍅 POMO TIME'
    }
  }, [timer.isRunning])

  // Handle music start/stop based on mode + running state
  useEffect(() => {
    if (timer.isRunning && mode === MODES.FOCUS) {
      sound.play('LOFI_BG')
    } else {
      sound.stop('LOFI_BG')
    }
    if (!timer.isRunning) sound.stop('TICK')
  }, [timer.isRunning, mode, sound])

  // Switch mode (resets timer to that mode's duration)
  const switchMode = useCallback((newMode) => {
    sound.play('CLICK')
    sound.stop('LOFI_BG')
    setMode(newMode)
  }, [sound])

  // Wrapped controls with sound effects
  const startTimer = useCallback(() => {
    sound.play('CLICK')
    timer.start()
  }, [timer, sound])

  const pauseTimer = useCallback(() => {
    sound.play('CLICK')
    timer.pause()
  }, [timer, sound])

  const resetTimer = useCallback(() => {
    sound.play('CLICK')
    timer.reset()
  }, [timer, sound])

  const toggleTimer = useCallback(() => {
    sound.play('CLICK')
    timer.toggle()
  }, [timer, sound])

  // Reset all data
  const resetAllData = useCallback(() => {
    setSettings(DEFAULT_SETTINGS)
    setStats(DEFAULT_STATS)
    setGarden(initialGarden())
    streakHook.resetStreak()
    achievementsHook.resetAchievements()
    setCompletedFocusInCycle(0)
    setMode(MODES.FOCUS)
    pushToast({ type: 'info', title: 'Reset Complete', message: 'All data cleared 🧹' })
  }, [setSettings, setStats, setGarden, streakHook, achievementsHook, pushToast])

  const addTask = useCallback((text) => {
    if (!text.trim()) return
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      pomoCount: 0,
      createdAt: new Date().toISOString()
    }
    setTasks(prev => [newTask, ...prev])
    sound.play('CLICK')
  }, [setTasks, sound.play])

  const toggleTask = useCallback((id) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const isNowCompleted = !t.completed;
        if (isNowCompleted && activeTaskId === id) setActiveTaskId(null);
        
        // Update dailyStats for completedTasks
        setDailyStats(statsPrev => {
          const today = todayKey();
          const current = statsPrev[today] || { pomos: 0, minutes: 0, completedTasks: 0 };
          return {
            ...statsPrev,
            [today]: {
              ...current,
              completedTasks: Math.max(0, (current.completedTasks || 0) + (isNowCompleted ? 1 : -1))
            }
          };
        });

        return { 
          ...t, 
          completed: isNowCompleted,
          completedAt: isNowCompleted ? new Date().toISOString() : undefined
        };
      }
      return t;
    }))
    sound.play('CLICK')
  }, [setTasks, sound.play, activeTaskId, setDailyStats])

  const deleteTask = useCallback((id) => {
    if (activeTaskId === id) setActiveTaskId(null);
    setTasks(prev => prev.filter(t => t.id !== id))
    sound.play('CLICK')
  }, [setTasks, sound.play, activeTaskId])

  const value = {
    // tasks
    tasks, addTask, toggleTask, deleteTask,
    activeTaskId, setActiveTaskId,
    // settings
    settings, setSettings,
    // stats
    stats, dailyStats,
    // garden
    garden,
    // streak
    streak: streakHook.streak,
    // achievements
    achievements: achievementsHook.unlocked,
    unlockedCount: achievementsHook.unlockedCount,
    isAchievementUnlocked: achievementsHook.isUnlocked,
    // mode
    mode, switchMode, completedFocusInCycle,
    // timer
    secondsLeft: timer.secondsLeft,
    isRunning: timer.isRunning,
    totalSeconds: currentDurationSec,
    startTimer, pauseTimer, resetTimer, toggleTimer,
    // sound
    muted, setMuted, playSfx: sound.play,
    // theme
    theme: theme.theme,
    isDark: theme.isDark,
    toggleTheme: theme.toggleTheme,
    setTheme: theme.setTheme,
    // toasts
    toasts, pushToast, removeToast,
    // utility
    resetAllData,
    // character
    characterConfig: characterConfigRaw ? normalizeCharacterConfig(characterConfigRaw) : null,
    saveCharacterConfig: (cfg) => setCharacterConfigRaw(cfg),
    sessionJustCompleted,
  }

  return <PomoContext.Provider value={value}>{children}</PomoContext.Provider>
}
