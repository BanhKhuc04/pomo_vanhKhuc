import React from 'react'
import clsx from 'clsx'
import { usePomo } from '../../context/PomoContext'
import { SESSIONS_BEFORE_LONG } from '../../data/constants'

export default function SessionCounter() {
  const { completedFocusInCycle } = usePomo()
  return (
    <div className="flex items-center gap-2 justify-center">
      <span className="retro-text text-sm text-textMuted">Cycle:</span>
      <div className="flex gap-1.5">
        {Array.from({ length: SESSIONS_BEFORE_LONG }).map((_, i) => (
          <div
            key={i}
            className={clsx(
              'w-4 h-4 border-2',
              i < completedFocusInCycle
                ? 'border-amber bg-amber'
                : 'border-panelBorder bg-panelDeep'
            )}
          />
        ))}
      </div>
    </div>
  )
}
