import React from 'react'
import PixelButton from '../UI/PixelButton'
import { usePomo } from '../../context/PomoContext'
import { MODES, MODE_LABELS } from '../../data/constants'

const TABS = [
  { mode: MODES.FOCUS, label: 'Focus', emoji: '🍅' },
  { mode: MODES.SHORT_BREAK, label: 'Short', emoji: '☕' },
  { mode: MODES.LONG_BREAK, label: 'Long', emoji: '😴' }
]

export default function SessionTabs() {
  const { mode, switchMode } = usePomo()
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {TABS.map(t => (
        <PixelButton
          key={t.mode}
          variant={mode === t.mode ? 'primary' : 'ghost'}
          size="sm"
          active={mode === t.mode}
          onClick={() => switchMode(t.mode)}
          ariaLabel={`Switch to ${MODE_LABELS[t.mode]}`}
        >
          <span className="text-base">{t.emoji}</span>
          <span>{t.label}</span>
        </PixelButton>
      ))}
    </div>
  )
}
