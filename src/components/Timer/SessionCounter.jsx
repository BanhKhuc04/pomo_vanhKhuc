import React from 'react'
import clsx from 'clsx'
import { usePomo } from '../../context/PomoContext'
import { SESSIONS_BEFORE_LONG } from '../../data/constants'

export default function SessionCounter() {
  const { completedFocusInCycle } = usePomo()
  return (
    <div className="flex items-center gap-2 justify-center">
      <span className="retro-text text-base text-ink/70 dark:text-cream/70">Cycle:</span>
      <div className="flex gap-1.5">
        {Array.from({ length: SESSIONS_BEFORE_LONG }).map((_, i) => (
          <div
            key={i}
            className={clsx(
              'w-4 h-4 pixel-border-thick',
              i < completedFocusInCycle
                ? 'bg-orange dark:bg-star'
                : 'bg-cream dark:bg-nightCard'
            )}
          />
        ))}
      </div>
    </div>
  )
}
