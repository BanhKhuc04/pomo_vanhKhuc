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
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Mode label */}
      <div className="flex items-center gap-1.5 retro-text text-[13px] text-textMain/80 mb-[-10px] z-10">
        <span className="text-sm" style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.2))' }}>{MODE_EMOJI[mode]}</span>
        <span className="tracking-widest uppercase">{MODE_LABELS[mode]} Time</span>
      </div>

      {/* Timer digits */}
      <motion.div
        animate={isUrgent ? { scale: [1, 1.04, 1] } : { scale: 1 }}
        transition={{ duration: 0.5, repeat: isUrgent ? Infinity : 0 }}
        className={clsx(
          'pixel-text text-[5rem] sm:text-[6rem] md:text-[7rem] leading-none select-none text-center',
          isUrgent ? 'text-neonPink' : 'text-[#FFE8C2]'
        )}
        style={{ textShadow: '0 0 40px rgba(139, 92, 246, 0.4)' }}
      >
        {formatTime(secondsLeft)}
      </motion.div>

      {/* Progress bar */}
      <PixelProgressBar progress={progress} chunks={19} color={MODE_COLOR[mode]} className="w-full" />
    </div>
  )
}
