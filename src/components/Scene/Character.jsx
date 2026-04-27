import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePomo } from '../../context/PomoContext'
import { MODES } from '../../data/constants'

export default function Character() {
  const { mode, isRunning } = usePomo()

  let imagePath = '/images/character/idle.png'
  let stateLabel = 'idle'

  if (!isRunning) {
    imagePath = '/images/character/idle.png'
    stateLabel = 'idle'
  } else if (mode === MODES.FOCUS) {
    imagePath = '/images/character/studying.png'
    stateLabel = 'studying'
  } else if (mode === MODES.SHORT_BREAK) {
    imagePath = '/images/character/break.png'
    stateLabel = 'break'
  } else if (mode === MODES.LONG_BREAK) {
    imagePath = '/images/character/sleeping.png'
    stateLabel = 'sleeping'
  }

  return (
    <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 z-20 w-32 h-32 sm:w-40 sm:h-40">
      <AnimatePresence mode="wait">
        <motion.img
          key={stateLabel}
          src={imagePath}
          alt={`Character is ${stateLabel}`}
          initial={{ opacity: 0, scale: 0.9, y: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full h-full object-contain pixelated"
        />
      </AnimatePresence>
      
      {/* Subtle breathing animation for all states */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ 
          scaleY: [1, 1.02, 1],
          y: [0, -1, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
