import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePomo } from '../../context/PomoContext'
import { MODES } from '../../data/constants'
import { randInt } from '../../utils/helpers'

/**
 * Cat sleeping on the desk, beside the monitor.
 * Clicks → meow + toast. Wanders when idle.
 */
export default function Pet() {
  const { mode, isRunning, playSfx, pushToast } = usePomo()
  const [petted, setPetted] = useState(false)

  const handleClick = () => {
    playSfx('MEOW')
    setPetted(true)
    pushToast({ type: 'info', title: 'Meow!', message: 'Mochi wants attention 🐱', duration: 2000 })
    setTimeout(() => setPetted(false), 800)
  }

  const isSleeping = mode === MODES.LONG_BREAK || (!isRunning && mode !== MODES.FOCUS)

  return (
    // Cat sits on desk — right side, between desk lamp and monitor area
    <motion.button
      onClick={handleClick}
      // Fixed position on the desk
      className="absolute z-30 cursor-pointer select-none focus:outline-none"
      style={{ bottom: 'calc(20% + 20px)', right: '24%' }}
      animate={{ scale: petted ? [1, 1.25, 1] : 1 }}
      transition={{ duration: petted ? 0.4 : 0.2 }}
      aria-label="Pet the cat"
    >
      {/* Try PNG asset */}
      <img
        src={`/images/avatar/pets/cat-${isSleeping ? 'sleep' : 'idle'}.png`}
        alt="Cat"
        className="w-8 h-8 sm:w-10 sm:h-10 object-contain pixelated"
        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
      />

      {/* CSS cat fallback */}
      <div style={{ display: 'none' }}>
        <div className="relative">
          {/* Cat body */}
          <div className="w-8 h-5 border-2 border-[#1A1A2E]"
               style={{ background: '#2D2D3A', borderRadius: '40% 40% 30% 30% / 60% 60% 40% 40%' }} />
          {/* Cat ears */}
          <div className="absolute -top-2 left-1 w-2 h-2 border-l-2 border-t-2 border-[#1A1A2E]"
               style={{ background: '#2D2D3A', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          <div className="absolute -top-2 right-1 w-2 h-2 border-r-2 border-t-2 border-[#1A1A2E]"
               style={{ background: '#2D2D3A', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          {/* Eyes */}
          <div className="absolute top-1 left-2 w-1 h-1 rounded-full"
               style={{ background: isSleeping ? '#1A1A2E' : '#7C3AED' }} />
          <div className="absolute top-1 right-2 w-1 h-1 rounded-full"
               style={{ background: isSleeping ? '#1A1A2E' : '#7C3AED' }} />
          {/* Tail */}
          <motion.div
            className="absolute -right-3 bottom-0 w-4 h-[3px] rounded-none"
            style={{ background: '#2D2D3A', transformOrigin: 'left center' }}
            animate={!isSleeping ? { rotate: [-20, 20, -20] } : { rotate: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {isSleeping && (
        <span className="absolute -top-3 -right-1 text-xs animate-zzz">💤</span>
      )}
      {petted && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-sm">❤️</span>
      )}
    </motion.button>
  )
}
