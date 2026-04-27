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
    <div className="grid grid-cols-3 gap-3.5 w-full max-w-[980px]">
      {TABS.map(t => {
        const isActive = mode === t.mode
        return (
          <button
            key={t.mode}
            onClick={() => switchMode(t.mode)}
            aria-label={`Switch to ${MODE_LABELS[t.mode]}`}
            className={clsx(
              'pixel-text text-[10px] sm:text-[11px] flex items-center justify-center gap-2 px-4 py-3.5 border rounded-xl uppercase transition-all whitespace-nowrap min-w-0',
              isActive
                ? 'text-white border-[#9B7CFF] bg-gradient-to-b from-[#6339D8] to-[#492DA9]'
                : 'text-[#B8AFDA] border-panelBorder bg-[#111230] hover:bg-[#17173B] hover:text-textMain'
            )}
            style={isActive ? { boxShadow: '0 0 0 1px rgba(198,169,255,0.34), 0 14px 34px rgba(88,61,205,0.46)' } : { boxShadow: 'inset 0 0 0 1px rgba(76,61,137,0.22)' }}
          >
            <span className="text-[14px]">{t.emoji}</span>
            <span>{t.label}</span>
          </button>
        )
      })}
    </div>
  )
}
