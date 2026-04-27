import { useCallback } from 'react'
import useLocalStorage from './useLocalStorage'
import { STORAGE_KEYS } from '../data/constants'
import { ACHIEVEMENTS } from '../data/achievements'

export default function useAchievements() {
  const [unlocked, setUnlocked] = useLocalStorage(STORAGE_KEYS.ACHIEVEMENTS, {})

  /**
   * Check achievements against current context.
   * @returns {Array} newly unlocked achievement objects
   */
  const checkAchievements = useCallback((ctx) => {
    const newlyUnlocked = []
    setUnlocked(prev => {
      const next = { ...prev }
      ACHIEVEMENTS.forEach(a => {
        if (!next[a.id] && a.check(ctx)) {
          next[a.id] = { unlockedAt: new Date().toISOString() }
          newlyUnlocked.push(a)
        }
      })
      return next
    })
    return newlyUnlocked
  }, [setUnlocked])

  const isUnlocked = useCallback((id) => Boolean(unlocked[id]), [unlocked])

  const resetAchievements = useCallback(() => setUnlocked({}), [setUnlocked])

  const unlockedCount = Object.keys(unlocked).length

  return { unlocked, checkAchievements, isUnlocked, resetAchievements, unlockedCount }
}
