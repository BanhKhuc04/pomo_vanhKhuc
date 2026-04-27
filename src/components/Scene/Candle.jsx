import React from 'react'
import { motion } from 'framer-motion'
import { usePomo } from '../../context/PomoContext'
import { MODES } from '../../data/constants'

/**
 * Desk lamp candle replacement — shows flame flicker during focus.
 * In coder room: we replaced candle with a neon LED strip instead.
 * Kept for backward compat but now renders an ambient light strip.
 */
export default function Candle() {
  const { mode, isRunning } = usePomo()
  const lit = isRunning && mode === MODES.FOCUS

  return (
    // LED strip along top-left of room (subtle ambient)
    <div className="absolute left-0 top-0 w-full h-[3px] z-5 pointer-events-none">
      <motion.div
        className="h-full"
        style={{
          background: lit
            ? 'linear-gradient(90deg, transparent 0%, #7C3AED60 20%, #4F46E580 50%, #7C3AED60 80%, transparent 100%)'
            : 'transparent',
          boxShadow: lit ? '0 2px 8px #7C3AED40' : 'none',
        }}
        animate={lit ? { opacity: [0.7, 1, 0.7] } : { opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  )
}
