import React from 'react'
import { usePomo } from '../../context/PomoContext'
import { MODES, MODE_LABELS } from '../../data/constants'
import clsx from 'clsx'

const TABS = [
  { mode: MODES.FOCUS,       label: 'Focus',  emoji: '🍅' },
  { mode: MODES.SHORT_BREAK, label: 'Short',  emoji: '☕' },
  { mode: MODES.LONG_BREAK,  label: 'Long',   emoji: '😴' },
]

export default function SessionTabs() {
  const { mode, switchMode } = usePomo()

  return (
    <div className="flex items-center justify-center gap-2 w-full">
      {TABS.map(t => {
        const isActive = mode === t.mode
        return (
          <button
            key={t.mode}
            onClick={() => switchMode(t.mode)}
            aria-label={`Switch to ${MODE_LABELS[t.mode]}`}
            className={clsx(
              'pixel-text text-[9px] sm:text-[10px] flex items-center justify-center gap-2 px-4 py-2 border rounded-md uppercase transition-colors whitespace-nowrap min-w-[100px]',
              isActive
                ? 'text-white border-vio bg-panelDeep'
                : 'text-textMuted border-panelBorder bg-panel hover:bg-panelDeep hover:text-textMain'
            )}
            style={isActive ? { boxShadow: '0 0 10px rgba(139, 92, 246, 0.2)' } : {}}
          >
            <span className="text-sm">{t.emoji}</span>
            <span>{t.label}</span>
          </button>
        )
      })}
    </div>
  )
}
