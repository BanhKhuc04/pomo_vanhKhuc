import React from 'react'
import { motion } from 'framer-motion'
import { usePomo } from '../../context/PomoContext'

export default function StreakBadge({ compact = false }) {
  const { streak } = usePomo()
  const count = streak.count || 0

  return (
    <div
      className="inline-flex items-center gap-2 border border-panelBorder rounded-md px-3 py-1.5 bg-panelDeep/50"
    >
      <span className="text-sm">🔥</span>
      <span className="pixel-text text-[10px] text-textMain tracking-tighter uppercase">
        {count} {count === 1 ? 'day' : 'days'}
      </span>
    </div>
  )
}
