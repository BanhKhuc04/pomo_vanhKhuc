import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { usePomo } from '../../context/PomoContext'
import { getTimePhase } from '../../utils/helpers'
import clsx from 'clsx'

const SKY_CLASS = {
  sunrise: 'sky-sunrise',
  day:     'sky-day',
  sunset:  'sky-sunset',
  night:   'sky-night',
}

export default function Window() {
  const { isDark } = usePomo()
  const phase = isDark ? 'night' : getTimePhase()

  const stars = useMemo(() => Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    top:   Math.random() * 75,
    left:  Math.random() * 88,
    delay: Math.random() * 3,
    size:  Math.random() > 0.5 ? 'text-xs' : 'text-[8px]',
    brightness: Math.random() > 0.7 ? 'text-amber' : 'text-textMain/70',
  })), [])

  const clouds = useMemo(() => [
    { top: 10, delay: 0, duration: 30 },
    { top: 22, delay: 8, duration: 42 },
    { top: 5,  delay: 18, duration: 36 },
  ], [])

  // City silhouette buildings in bottom of window
  const buildings = useMemo(() => [
    { left: '4%',  width: 10, height: 24 },
    { left: '12%', width: 7,  height: 18 },
    { left: '18%', width: 14, height: 32 },
    { left: '30%', width: 8,  height: 20 },
    { left: '37%', width: 12, height: 28 },
    { left: '48%', width: 6,  height: 16 },
    { left: '53%', width: 10, height: 22 },
    { left: '62%', width: 16, height: 34 },
    { left: '76%', width: 9,  height: 26 },
    { left: '84%', width: 7,  height: 20 },
    { left: '90%', width: 8,  height: 30 },
  ], [])

  // Building windows (lit up at night)
  const buildingLights = useMemo(() => Array.from({ length: 22 }).map((_, i) => ({
    id: i,
    left: Math.random() * 90 + '%',
    bottom: Math.random() * 30 + 2 + '%',
    on: Math.random() > 0.3,
    blink: Math.random() > 0.8,
  })), [])

  return (
    // Window: wider, positioned top-left-ish so coder is visible on right
    <div className="absolute top-[6%] left-[8%] w-[42%] h-[68%] z-10">
      {/* Window frame – chunky dark wood */}
      <div className="relative w-full h-full border-4 border-[#2A1F4A] bg-[#1a1740]"
           style={{ boxShadow: '4px 4px 0 #0D0B1A, inset 0 0 0 2px #3D2F6A' }}>
        {/* Sky pane */}
        <div className={clsx('relative w-full h-full overflow-hidden', SKY_CLASS[phase])}>

          {/* City buildings silhouette (night) */}
          {phase === 'night' && (
            <div className="absolute bottom-0 left-0 right-0 h-[45%] z-10">
              {buildings.map((b, i) => (
                <div
                  key={i}
                  className="absolute bottom-0 bg-[#0D0B1A]"
                  style={{ left: b.left, width: b.width, height: b.height }}
                >
                  {/* Building windows */}
                  <div className="absolute inset-0">
                    {Array.from({ length: 4 }).map((_, wi) => (
                      <div
                        key={wi}
                        className="absolute w-1 h-1"
                        style={{
                          top: `${15 + wi * 22}%`,
                          left: '25%',
                          background: Math.random() > 0.4 ? '#FBBF24' : 'transparent',
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
              {/* Building lights floating above */}
              {buildingLights.filter(l => l.on).map(l => (
                <motion.div
                  key={l.id}
                  className="absolute w-[3px] h-[3px] bg-amber/80"
                  style={{ left: l.left, bottom: l.bottom }}
                  animate={l.blink ? { opacity: [1, 0.2, 1] } : { opacity: 1 }}
                  transition={{ duration: 2 + Math.random(), repeat: Infinity }}
                />
              ))}
            </div>
          )}

          {/* Day: sun + clouds */}
          {phase === 'day' && (
            <>
              <motion.div className="absolute top-2 right-3 text-2xl pixel-emoji"
                animate={{ y: [0,-3,0] }} transition={{ duration: 4, repeat: Infinity }}>
                ☀️
              </motion.div>
              {clouds.map((c, i) => (
                <motion.div key={i} className="absolute text-lg pixel-emoji"
                  style={{ top: `${c.top}px` }}
                  initial={{ left: '-30%' }} animate={{ left: '120%' }}
                  transition={{ duration: c.duration, delay: c.delay, repeat: Infinity, ease: 'linear' }}>
                  ☁️
                </motion.div>
              ))}
            </>
          )}

          {/* Sunrise/sunset */}
          {(phase === 'sunrise' || phase === 'sunset') && (
            <motion.div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-3xl pixel-emoji"
              animate={{ y: [0,-2,0] }} transition={{ duration: 3, repeat: Infinity }}>
              {phase === 'sunrise' ? '🌅' : '🌇'}
            </motion.div>
          )}

          {/* Night: moon + stars */}
          {phase === 'night' && (
            <>
              <motion.div className="absolute top-[12%] right-[15%] text-2xl pixel-emoji z-20"
                animate={{ rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity }}>
                🌙
              </motion.div>
              {stars.map(s => (
                <motion.span key={s.id}
                  className={clsx('absolute select-none', s.size, s.brightness)}
                  style={{ top: `${s.top}%`, left: `${s.left}%` }}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 2.5, delay: s.delay, repeat: Infinity }}>
                  ✦
                </motion.span>
              ))}
              {/* Firefly */}
              <motion.div className="absolute text-xs z-20"
                animate={{ x: [0,50,90,30,0], y: [40,20,60,80,40] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}>
                ✨
              </motion.div>
            </>
          )}
        </div>

        {/* Window cross dividers */}
        <div className="absolute top-1/2 left-1 right-1 h-1 bg-[#2A1F4A] -translate-y-1/2 pointer-events-none z-30" />
        <div className="absolute left-1/2 top-1 bottom-1 w-1 bg-[#2A1F4A] -translate-x-1/2 pointer-events-none z-30" />
      </div>

      {/* Window sill */}
      <div className="absolute -bottom-2 -left-1 -right-1 h-3 bg-[#2A1F4A] border-2 border-[#0D0B1A]" />

      {/* Small plant on window sill */}
      <div className="absolute -bottom-1 right-[-12px] text-base animate-sway origin-bottom z-20">🌿</div>
    </div>
  )
}
