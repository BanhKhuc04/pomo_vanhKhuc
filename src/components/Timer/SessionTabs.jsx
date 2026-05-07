import React from 'react'
import { usePomo } from '../../context/PomoContext'
import { MODES } from '../../data/constants'
import clsx from 'clsx'
import { getModeLabel } from '../../data/translations'

export default function SessionTabs() {
  const { mode, switchMode, locale, playHoverSfx, t } = usePomo()
  const tabs = [
    { mode: MODES.FOCUS, emoji: '🍅' },
    { mode: MODES.SHORT_BREAK, emoji: '☕' },
    { mode: MODES.LONG_BREAK, emoji: '😴' },
  ]

  return (
    <div className="session-tabs-grid grid grid-cols-3 gap-3 w-full max-w-[980px]">
      {tabs.map(tab => {
        const isActive = mode === tab.mode
        return (
          <button
            key={tab.mode}
            onClick={() => switchMode(tab.mode)}
            onMouseEnter={playHoverSfx}
            aria-label={t('timer.switchTo', { mode: getModeLabel(locale, tab.mode) })}
            className={clsx(
              'session-tab-btn pixel-text text-[9px] sm:text-[10px] flex items-center justify-center gap-1.5 px-3 py-3 border rounded-xl uppercase transition-all whitespace-nowrap min-w-0',
              isActive
                ? 'text-white'
                : 'app-secondary-btn'
            )}
            style={isActive
              ? {
                  background: 'var(--app-primary-btn-bg)',
                  borderColor: 'var(--app-primary-btn-border)',
                  boxShadow: '0 0 0 1px rgba(198,169,255,0.34), 0 14px 34px rgba(88,61,205,0.34)',
                }
              : { boxShadow: 'inset 0 0 0 1px rgba(76,61,137,0.12)' }}
          >
            <span className="text-[13px]">{tab.emoji}</span>
            <span>{getModeLabel(locale, tab.mode, 'tabs')}</span>
          </button>
        )
      })}
    </div>
  )
}
