import React from 'react'
import clsx from 'clsx'
import { usePomo } from '../../context/PomoContext'
import { SESSIONS_BEFORE_LONG } from '../../data/constants'

export default function SessionCounter() {
  const { completedFocusInCycle, t } = usePomo()
  return (
    <div className="session-counter flex items-center gap-2.5 justify-center">
      <span className="session-counter-label retro-text text-[20px] sm:text-[22px] leading-none app-muted">{t('timer.cycle')}</span>
      <div className="flex gap-2">
        {Array.from({ length: SESSIONS_BEFORE_LONG }).map((_, i) => (
          <div
            key={i}
            className={clsx(
              'session-counter-chip w-7 h-7 border rounded-md flex items-center justify-center pixel-text text-[8px]',
              i < completedFocusInCycle
                ? 'border-[#E6BA4B] bg-[#4E359F] text-[#FFE39B]'
                : 'app-muted'
            )}
            style={i < completedFocusInCycle ? undefined : { borderColor: 'var(--app-card-border)', background: 'var(--app-panel-deep)' }}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}
