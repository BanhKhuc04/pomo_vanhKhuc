import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { usePomo } from '../../context/PomoContext'
import { getTimePhase } from '../../utils/helpers'
import clsx from 'clsx'

const SKY_CLASS = {
  sunrise: 'sky-sunrise',
  day: 'sky-day',
  sunset: 'sky-sunset',
  night: 'sky-night'
}

export default function Window() {
  const { isDark } = usePomo()
  const phase = isDark ? 'night' : getTimePhase()

  // Generate fixed positions for stars/clouds (memoized)
  const stars = useMemo(() => Array.from({ length: 14 }).map((_, i) => ({
    id: i,
    top: Math.random() * 70,
    left: Math.random() * 90,
    delay: Math.random() * 2,
    size: Math.random() > 0.5 ? 'text-xs' : 'text-[8px]'
  })), [])

  const clouds = useMemo(() => [
    { top: 10, delay: 0, duration: 30 },
    { top: 25, delay: 8, duration: 40 },
    { top: 5, delay: 18, duration: 35 }
  ], [])

  const drops = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 0.5 + Math.random() * 0.5
  })), [])

  const isRaining = useMemo(() => Math.random() > 0.7, [])

  return (
    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[140px] h-[100px] sm:w-[180px] sm:h-[130px] z-10">
      {/* Window frame */}
      <div className="relative w-full h-full pixel-border-thick pixel-shadow no-rounded bg-woodDark dark:bg-purple-900 p-2">
        {/* Sky pane */}
        <div className={clsx('relative w-full h-full overflow-hidden', SKY_CLASS[phase])}>
          {/* Rain effect */}
          {isRaining && (
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
              {drops.map(d => (
                <motion.div
                  key={d.id}
                  className="absolute w-[1px] h-3 bg-blue-400/40"
                  style={{ left: `${d.left}%` }}
                  initial={{ y: -20 }}
                  animate={{ y: 150 }}
                  transition={{
                    duration: d.duration,
                    delay: d.delay,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              ))}
            </div>
          )}
          {/* Day elements */}
          {phase === 'day' && (
            <>
              {/* Sun */}
              <motion.div
                className="absolute top-2 right-3 text-2xl pixel-emoji"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                ☀️
              </motion.div>
              {/* Clouds */}
              {clouds.map((c, i) => (
                <motion.div
                  key={i}
                  className="absolute text-lg pixel-emoji"
                  style={{ top: `${c.top}px` }}
                  initial={{ left: '-30%' }}
                  animate={{ left: '120%' }}
                  transition={{
                    duration: c.duration,
                    delay: c.delay,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  ☁️
                </motion.div>
              ))}
              {/* Bird */}
              <motion.div
                className="absolute text-sm pixel-emoji"
                style={{ top: '40%' }}
                initial={{ left: '-20%' }}
                animate={{ left: '120%', top: ['40%', '30%', '45%', '35%'] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear', delay: 5 }}
              >
                🐦
              </motion.div>
            </>
          )}
          {/* Sunrise/Sunset */}
          {(phase === 'sunrise' || phase === 'sunset') && (
            <motion.div
              className="absolute bottom-2 left-1/2 -translate-x-1/2 text-3xl pixel-emoji"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {phase === 'sunrise' ? '🌅' : '🌇'}
            </motion.div>
          )}
          {/* Night elements */}
          {phase === 'night' && (
            <>
              {/* Moon */}
              <motion.div
                className="absolute top-2 right-3 text-2xl pixel-emoji"
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                🌙
              </motion.div>
              {/* Stars */}
              {stars.map(s => (
                <motion.div
                  key={s.id}
                  className={clsx('absolute text-star', s.size)}
                  style={{ top: `${s.top}%`, left: `${s.left}%` }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, delay: s.delay, repeat: Infinity }}
                >
                  ✦
                </motion.div>
              ))}
              {/* Firefly */}
              <motion.div
                className="absolute text-xs"
                animate={{
                  x: [0, 60, 100, 40, 0],
                  y: [50, 30, 70, 90, 50]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              >
                ✨
              </motion.div>
            </>
          )}
        </div>
        {/* Window cross */}
        <div className="absolute top-1/2 left-2 right-2 h-1 bg-woodDark dark:bg-purple-900 -translate-y-1/2 pointer-events-none" />
        <div className="absolute left-1/2 top-2 bottom-2 w-1 bg-woodDark dark:bg-purple-900 -translate-x-1/2 pointer-events-none" />
      </div>
      {/* Window sill */}
      <div className="absolute -bottom-2 -left-2 -right-2 h-3 bg-wood dark:bg-purple-800 pixel-border" />
    </div>
  )
}
