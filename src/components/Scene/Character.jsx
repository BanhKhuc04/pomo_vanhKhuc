import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePomo } from '../../context/PomoContext'
import { MODES } from '../../data/constants'

/**
 * CSS-only pixel-art coder character.
 * Male, black hair, glasses, dark hoodie.
 * States: idle | coding (focus) | break | sleeping
 */
export default function Character() {
  const { mode, isRunning } = usePomo()

  const isFocusing = isRunning && mode === MODES.FOCUS
  const isShortBreak = isRunning && mode === MODES.SHORT_BREAK
  const isLongBreak = mode === MODES.LONG_BREAK && !isRunning
  const isIdle = !isRunning && mode === MODES.FOCUS

  // Try PNG first, fallback to CSS character
  const imagePath = isFocusing
    ? '/images/character/studying.png'
    : isShortBreak
    ? '/images/character/break.png'
    : isLongBreak
    ? '/images/character/sleeping.png'
    : '/images/character/idle.png'

  return (
    <div className="absolute bottom-[18%] right-[18%] sm:right-[22%] z-20 flex flex-col items-center">
      {/* Try PNG asset first */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode + isRunning}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* PNG character (uses asset if exists) */}
          <img
            src={imagePath}
            alt="Coder character"
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain pixelated"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />

          {/* CSS fallback character — hidden until img fails */}
          <div style={{ display: 'none' }} className="flex flex-col items-center gap-0">
            {/* Head */}
            <div className="relative w-10 h-10 border-2 border-[#1a1a2e]"
                 style={{ background: '#F4A261' }}>
              {/* Hair — black, messy top */}
              <div className="absolute -top-3 left-0 right-0 h-4 border-b-2 border-[#1a1a2e]"
                   style={{ background: '#1A1A2E' }} />
              {/* Glasses */}
              <div className="absolute top-4 left-1 right-1 flex gap-1">
                <div className="flex-1 h-2 border border-[#4B3B78]" style={{ background: 'transparent', boxShadow: 'inset 0 0 0 1px #7C3AED40' }} />
                <div className="w-1 h-[1px] bg-[#4B3B78] self-center" />
                <div className="flex-1 h-2 border border-[#4B3B78]" style={{ background: 'transparent', boxShadow: 'inset 0 0 0 1px #7C3AED40' }} />
              </div>
              {/* Eyes */}
              <div className="absolute top-4 left-2 w-1 h-1 bg-[#1A1A2E]" />
              <div className="absolute top-4 right-2 w-1 h-1 bg-[#1A1A2E]" />
              {/* Mouth — neutral or smile */}
              {isShortBreak
                ? <div className="absolute bottom-2 left-3 right-3 h-[3px] border-b-2 border-[#1A1A2E] rounded-full" />
                : <div className="absolute bottom-2 left-3 right-3 h-[2px] bg-[#1A1A2E]" />
              }
            </div>

            {/* Hoodie body */}
            <div className="relative w-14 h-10 border-2 border-[#1a1a2e] -mt-[1px]"
                 style={{ background: '#1E1B4B' }}>
              {/* Hood collar */}
              <div className="absolute top-0 left-2 right-2 h-3 border-b-2 border-[#4B3B78]"
                   style={{ background: '#2D2B4E' }} />
              {/* Arms */}
              {isFocusing ? (
                // Typing arms
                <>
                  <motion.div className="absolute -left-4 top-3 w-4 h-2 border-2 border-[#1A1A2E] origin-right"
                    style={{ background: '#1E1B4B' }}
                    animate={{ rotate: [0,-8,0] }}
                    transition={{ duration: 0.2, repeat: Infinity }} />
                  <motion.div className="absolute -right-4 top-3 w-4 h-2 border-2 border-[#1A1A2E] origin-left"
                    style={{ background: '#1E1B4B' }}
                    animate={{ rotate: [0,8,0] }}
                    transition={{ duration: 0.2, repeat: Infinity, delay: 0.1 }} />
                </>
              ) : (
                <>
                  <div className="absolute -left-3 top-3 w-3 h-2 border-2 border-[#1A1A2E]" style={{ background: '#1E1B4B' }} />
                  <div className="absolute -right-3 top-3 w-3 h-2 border-2 border-[#1A1A2E]" style={{ background: '#1E1B4B' }} />
                </>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* State indicators */}
      {isFocusing && (
        <motion.div className="absolute -top-5 left-1/2 -translate-x-1/2 pixel-text text-[8px] text-amber whitespace-nowrap"
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
          💻 coding...
        </motion.div>
      )}
      {isLongBreak && (
        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-lg animate-zzz">💤</span>
      )}
    </div>
  )
}
