import React from 'react'
import { usePomo } from '../../context/PomoContext'

export default function StreakBadge({ compact = false }) {
  const { streak } = usePomo()
  const count = streak.count || 0

  return (
    <div
      className="inline-flex items-center gap-2 border border-[#6D4B24] rounded-lg px-3 py-1.5 bg-[#1A1638] shadow-[inset_0_0_12px_rgba(251,191,36,0.14)]"
    >
      <span className="text-[14px] leading-none">🔥</span>
      <span className="pixel-text text-[10px] text-[#FFD772] tracking-tight uppercase">
        {count} {count === 1 ? 'day' : 'days'}
      </span>
    </div>
  )
}
