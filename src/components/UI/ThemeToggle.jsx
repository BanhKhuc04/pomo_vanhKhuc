import React from 'react'
import { Laptop, Moon, Sun } from 'lucide-react'
import { usePomo } from '../../context/PomoContext'

export default function ThemeToggle() {
  const { isDark, theme, setTheme } = usePomo()
  const nextTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'auto' : 'dark'
  return (
    <button
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch theme mode from ${theme} to ${nextTheme}`}
      className="w-8 h-8 flex items-center justify-center rounded-lg border border-panelBorder hover:border-vio/60 transition-colors bg-panelDeep/80 text-textMain"
    >
      {theme === 'auto'
        ? <Laptop size={16} className="text-vio" />
        : isDark
        ? <Sun size={16} className="text-amber" />
        : <Moon size={16} className="text-textMuted" />}
    </button>
  )
}
