import React from 'react'
import { Sun, Moon } from 'lucide-react'
import PixelButton from './PixelButton'
import { usePomo } from '../../context/PomoContext'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = usePomo()
  return (
    <PixelButton
      variant="wood"
      size="icon"
      onClick={toggleTheme}
      ariaLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="!p-0"
    >
      {isDark
        ? <Sun size={20} className="text-star animate-pulse-fast" />
        : <Moon size={20} className="text-ink" />}
    </PixelButton>
  )
}
