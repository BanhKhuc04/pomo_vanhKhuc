import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { usePomo } from '../../context/PomoContext'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = usePomo()
  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="w-8 h-8 flex items-center justify-center border-2 border-panelBorder hover:border-vio/60 transition-colors no-rounded"
      style={{ background: '#17142B' }}
    >
      {isDark
        ? <Sun size={16} className="text-amber" />
        : <Moon size={16} className="text-textMuted" />}
    </button>
  )
}
