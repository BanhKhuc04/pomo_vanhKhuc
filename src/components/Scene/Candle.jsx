import React from 'react'
import { motion } from 'framer-motion'
import { usePomo } from '../../context/PomoContext'
import { MODES } from '../../data/constants'

export default function Candle() {
  const { mode, isRunning } = usePomo()
  const lit = isRunning && mode === MODES.FOCUS

  return (
    <div className="absolute right-3 sm:right-7 bottom-[28%] z-20 flex flex-col items-center">
      {/* Flame */}
      {lit && (
        <motion.div
          className="text-lg pixel-emoji"
          animate={{
            scale: [1, 1.2, 0.9, 1.1, 1],
            opacity: [1, 0.9, 1, 0.85, 1]
          }}
          transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          🔥
        </motion.div>
      )}
      {/* Candle body */}
      <div className="w-3 h-6 bg-cream dark:bg-cream pixel-border-thick" />
      <div className="w-5 h-2 bg-orange dark:bg-orangeDark pixel-border-thick -mt-[2px]" />
    </div>
  )
}
