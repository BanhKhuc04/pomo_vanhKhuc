import { useEffect, useMemo, useState } from 'react'
import { THEME_MODES } from '../data/constants'

function getSystemTheme() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return THEME_MODES.DARK
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEME_MODES.DARK
    : THEME_MODES.LIGHT
}

export default function useTheme(themeMode = THEME_MODES.DARK) {
  const [systemTheme, setSystemTheme] = useState(getSystemTheme)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const updateTheme = () => {
      setSystemTheme(media.matches ? THEME_MODES.DARK : THEME_MODES.LIGHT)
    }

    updateTheme()

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', updateTheme)
      return () => media.removeEventListener('change', updateTheme)
    }

    media.addListener(updateTheme)
    return () => media.removeListener(updateTheme)
  }, [])

  const resolvedTheme = useMemo(() => (
    themeMode === THEME_MODES.AUTO ? systemTheme : themeMode
  ), [systemTheme, themeMode])

  useEffect(() => {
    const root = document.documentElement
    const isDark = resolvedTheme === THEME_MODES.DARK

    root.classList.toggle('dark', isDark)
    root.dataset.theme = resolvedTheme
  }, [resolvedTheme])

  return {
    theme: themeMode,
    resolvedTheme,
    isDark: resolvedTheme === THEME_MODES.DARK,
  }
}
