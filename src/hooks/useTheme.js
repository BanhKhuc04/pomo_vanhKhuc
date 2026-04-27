import { useEffect, useCallback } from 'react'
import useLocalStorage from './useLocalStorage'
import { STORAGE_KEYS } from '../data/constants'

/**
 * Dashboard is intentionally dark-locked to match the product art direction.
 * Keep persisted theme key for backward compatibility with old storage.
 */
export default function useTheme() {
  const [, setTheme] = useLocalStorage(STORAGE_KEYS.THEME, 'dark')
  const resolvedTheme = 'dark'

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('dark')
  }, [resolvedTheme])

  const toggleTheme = useCallback(() => {
    setTheme('dark')
  }, [setTheme])

  const setDark = useCallback(() => setTheme('dark'), [setTheme])

  return {
    theme: 'dark',
    resolvedTheme,
    setTheme: setDark,
    toggleTheme,
    setAuto: setDark,
    isDark: true
  }
}
