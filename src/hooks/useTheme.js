import { useEffect, useCallback } from 'react'
import useLocalStorage from './useLocalStorage'
import { STORAGE_KEYS } from '../data/constants'
import { isNightHour } from '../utils/helpers'

/**
 * useTheme - manages light/dark theme
 * If autoMode is on, will follow system hour.
 */
export default function useTheme(autoMode = true) {
  // theme can be 'light' | 'dark' | 'auto'
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.THEME, 'auto')

  const resolvedTheme = (() => {
    if (theme === 'auto' || (autoMode && theme !== 'light' && theme !== 'dark')) {
      return isNightHour() ? 'dark' : 'light'
    }
    return theme
  })()

  useEffect(() => {
    const root = document.documentElement
    if (resolvedTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [resolvedTheme])

  // Auto-recheck every 10 minutes when in auto mode
  useEffect(() => {
    if (theme !== 'auto') return
    const id = setInterval(() => {
      const root = document.documentElement
      if (isNightHour()) root.classList.add('dark')
      else root.classList.remove('dark')
    }, 10 * 60 * 1000)
    return () => clearInterval(id)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(t => {
      const current = t === 'auto' ? (isNightHour() ? 'dark' : 'light') : t
      return current === 'dark' ? 'light' : 'dark'
    })
  }, [setTheme])

  const setAuto = useCallback(() => setTheme('auto'), [setTheme])

  return { theme, resolvedTheme, setTheme, toggleTheme, setAuto, isDark: resolvedTheme === 'dark' }
}
