import React from 'react'
import { motion } from 'framer-motion'
import { usePomo } from '../../context/PomoContext'
import clsx from 'clsx'

export default function StreakBadge({ compact = false }) {
  const { streak } = usePomo()
  const count = streak.count || 0

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={clsx(
        'inline-flex items-center gap-2 pixel-border pixel-shadow-sm no-rounded',
        'bg-orange dark:bg-amber-700 text-ink dark:text-cream',
        compact ? 'px-2 py-1' : 'px-3 py-1.5'
      )}
    >
      <motion.span
        className="text-lg"
        animate={count > 0 ? { rotate: [-10, 10, -10] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        🔥
      </motion.span>
      <span className="pixel-text text-[10px] sm:text-xs">
        {count} {count === 1 ? 'day' : 'days'}
      </span>
    </motion.div>
  )
}
