import React from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { usePomo } from '../../context/PomoContext'
import { formatTime } from '../../utils/helpers'
import PixelProgressBar from '../UI/PixelProgressBar'
import { MODES, MODE_EMOJI } from '../../data/constants'
import { getModeLabel } from '../../data/translations'

const MODE_COLOR = {
  [MODES.FOCUS]:       'violet',
  [MODES.SHORT_BREAK]: 'mint',
  [MODES.LONG_BREAK]:  'pink',
}

export default function TimerDisplay() {
  const { secondsLeft, totalSeconds, mode, isRunning, locale, t } = usePomo()
  const progress = totalSeconds > 0 ? 1 - secondsLeft / totalSeconds : 0
  const isUrgent = secondsLeft < 10 && secondsLeft > 0 && isRunning

  return (
    <div className="timer-display-shell flex flex-col items-center gap-3 w-full">
      {/* Mode label */}
      <div className="timer-display-label flex items-center gap-2 font-timer text-[16px] sm:text-[19px] leading-none z-10 app-main-text">
        <span className="text-[18px]" style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.2))' }}>{MODE_EMOJI[mode]}</span>
        <span className="tracking-wide">{t('timer.modeTime', { mode: getModeLabel(locale, mode) })}</span>
      </div>

      {/* Timer digits */}
      <motion.div
        animate={isUrgent ? { scale: [1, 1.04, 1] } : { scale: 1 }}
        transition={{ duration: 0.5, repeat: isUrgent ? Infinity : 0 }}
        className={clsx(
          'timer-display-value font-timer text-[4.7rem] sm:text-[6rem] md:text-[6.8rem] leading-none select-none text-center tracking-[0.02em]',
          isUrgent ? 'text-neonPink' : ''
        )}
        style={{
          color: isUrgent ? '#EC4899' : 'var(--app-text-main)',
          textShadow: '0 0 36px rgba(128,96,246,0.26), 0 0 12px rgba(255,232,194,0.12)',
        }}
      >
        {formatTime(secondsLeft)}
      </motion.div>

      {/* Progress bar */}
      <PixelProgressBar progress={progress} chunks={19} color={MODE_COLOR[mode]} className="w-full max-w-[98%]" />
    </div>
  )
}
