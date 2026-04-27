import React from 'react'
import clsx from 'clsx'
import { usePomo } from '../../context/PomoContext'
import { SESSIONS_BEFORE_LONG } from '../../data/constants'

export default function SessionCounter() {
  const { completedFocusInCycle } = usePomo()
  return (
    <div className="flex items-center gap-3 justify-center">
      <span className="retro-text text-[28px] leading-none text-textMuted">Cycle:</span>
      <div className="flex gap-2">
        {Array.from({ length: SESSIONS_BEFORE_LONG }).map((_, i) => (
          <div
            key={i}
            className={clsx(
              'w-7 h-7 border rounded-md flex items-center justify-center pixel-text text-[9px]',
              i < completedFocusInCycle
                ? 'border-[#E6BA4B] bg-[#4E359F] text-[#FFE39B]'
                : 'border-panelBorder bg-panelDeep text-textMuted/75'
            )}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}
