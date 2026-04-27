import { useCallback } from 'react'
import useLocalStorage from './useLocalStorage'
import { STORAGE_KEYS } from '../data/constants'
import { todayKey, daysBetween } from '../utils/helpers'

const DEFAULT_STREAK = {
  count: 0,
  lastDate: null
}

export default function useStreak() {
  const [streak, setStreak] = useLocalStorage(STORAGE_KEYS.STREAK, DEFAULT_STREAK)

  // Call when a focus session is completed
  const recordStudy = useCallback(() => {
    const today = todayKey()
    setStreak(prev => {
      const last = prev.lastDate
      if (!last) return { count: 1, lastDate: today }
      if (last === today) return prev // already counted
      const diff = daysBetween(last, today)
      if (diff === 1) {
        return { count: prev.count + 1, lastDate: today }
      } else if (diff > 1) {
        return { count: 1, lastDate: today }
      }
      return prev
    })
  }, [setStreak])

  // Auto-check whether streak should reset (called on app load)
  const checkExpiry = useCallback(() => {
    setStreak(prev => {
      if (!prev.lastDate) return prev
      const today = todayKey()
      const diff = daysBetween(prev.lastDate, today)
      if (diff > 1) {
        return { count: 0, lastDate: prev.lastDate }
      }
      return prev
    })
  }, [setStreak])

  const resetStreak = useCallback(() => setStreak(DEFAULT_STREAK), [setStreak])

  return { streak, recordStudy, checkExpiry, resetStreak }
}
