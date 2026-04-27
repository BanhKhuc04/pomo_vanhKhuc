import React from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { usePomo } from '../../context/PomoContext'
import { formatTime } from '../../utils/helpers'
import PixelProgressBar from '../UI/PixelProgressBar'
import { MODES, MODE_EMOJI, MODE_LABELS } from '../../data/constants'

const MODE_COLOR = {
  [MODES.FOCUS]:       'violet',
  [MODES.SHORT_BREAK]: 'mint',
  [MODES.LONG_BREAK]:  'pink',
}

export default function TimerDisplay() {
  const { secondsLeft, totalSeconds, mode, isRunning } = usePomo()
  const progress = totalSeconds > 0 ? 1 - secondsLeft / totalSeconds : 0
  const isUrgent = secondsLeft < 10 && secondsLeft > 0 && isRunning

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Mode label */}
      <div className="flex items-center gap-2 retro-text text-[23px] leading-none text-[#E8E1FF] z-10">
        <span className="text-[18px]" style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.2))' }}>{MODE_EMOJI[mode]}</span>
        <span className="tracking-wide">{MODE_LABELS[mode]} Time</span>
      </div>

      {/* Timer digits */}
      <motion.div
        animate={isUrgent ? { scale: [1, 1.04, 1] } : { scale: 1 }}
        transition={{ duration: 0.5, repeat: isUrgent ? Infinity : 0 }}
        className={clsx(
          'pixel-text text-[5.7rem] sm:text-[7.2rem] md:text-[7.8rem] leading-none select-none text-center tracking-[0.08em]',
          isUrgent ? 'text-neonPink' : 'text-[#FFE8C2]'
        )}
        style={{ textShadow: '0 0 42px rgba(128,96,246,0.45), 0 0 14px rgba(255,232,194,0.2)' }}
      >
        {formatTime(secondsLeft)}
      </motion.div>

      {/* Progress bar */}
      <PixelProgressBar progress={progress} chunks={19} color={MODE_COLOR[mode]} className="w-full max-w-[98%]" />
    </div>
  )
}
