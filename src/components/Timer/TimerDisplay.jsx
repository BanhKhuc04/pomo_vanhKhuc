import React from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { usePomo } from '../../context/PomoContext'
import { formatTime } from '../../utils/helpers'
import PixelProgressBar from '../UI/PixelProgressBar'
import { MODES, MODE_EMOJI, MODE_LABELS } from '../../data/constants'

export default function TimerDisplay() {
  const { secondsLeft, totalSeconds, mode, isRunning } = usePomo()
  const progress = totalSeconds > 0 ? 1 - secondsLeft / totalSeconds : 0
  const isUrgent = secondsLeft < 10 && secondsLeft > 0 && isRunning

  const colorByMode = {
    [MODES.FOCUS]: 'orange',
    [MODES.SHORT_BREAK]: 'mint',
    [MODES.LONG_BREAK]: 'pink'
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex items-center gap-2 retro-text text-xl text-ink dark:text-cream">
        <span className="text-2xl">{MODE_EMOJI[mode]}</span>
        <span>{MODE_LABELS[mode]}</span>
      </div>
      <motion.div
        animate={isUrgent ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        transition={{ duration: 0.5, repeat: isUrgent ? Infinity : 0 }}
        className={clsx(
          'pixel-text text-5xl sm:text-7xl md:text-8xl text-ink dark:text-cream timer-glow select-none text-center',
          isUrgent && 'text-orangeDark dark:text-rose-400'
        )}
      >
        {formatTime(secondsLeft)}
      </motion.div>
      <PixelProgressBar progress={progress} chunks={20} color={colorByMode[mode]} />
    </div>
  )
}
