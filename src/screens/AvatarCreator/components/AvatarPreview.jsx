import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import AvatarCharacter from '../../../components/Character/AvatarCharacter'

export default function AvatarPreview({ config, tick }) {
  const reduce = useReducedMotion()

  return (
    <div className="relative w-full flex items-center justify-center">
      {/* Glow blob behind avatar */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full blur-[40px] opacity-80"
        style={{
          background:
            'radial-gradient(circle at 40% 35%, rgba(124,58,237,0.55) 0%, rgba(37,99,235,0.25) 35%, rgba(236,72,153,0.15) 65%, rgba(0,0,0,0) 75%)',
        }}
      />

      {/* Cute floating sparkles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-white/25 select-none"
          initial={false}
          animate={
            reduce
              ? { opacity: 0.25 }
              : {
                  y: [0, -10, 0],
                  opacity: [0.15, 0.35, 0.15],
                }
          }
          transition={
            reduce
              ? {}
              : { duration: 3 + (i % 3) * 0.9, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }
          }
          style={{
            left: `${10 + (i * 9) % 80}%`,
            top: `${12 + (i * 13) % 60}%`,
            fontSize: 10 + (i % 4) * 3,
            filter: 'drop-shadow(0 0 12px rgba(124,58,237,0.25))',
          }}
        >
          *
        </motion.div>
      ))}

      <motion.div
        key={tick}
        className="relative rounded-[30px] border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
        initial={{ scale: 0.98, y: 6, rotate: -0.5, opacity: 0.9 }}
        animate={
          reduce
            ? { scale: 1, y: 0, rotate: 0, opacity: 1 }
            : { scale: 1, y: 0, rotate: 0, opacity: 1 }
        }
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        style={{
          padding: 18,
          backdropFilter: 'blur(10px)',
        }}
      >
        <motion.div
          initial={false}
          animate={
            reduce
              ? {}
              : {
                  y: [0, -10, 0],
                  rotate: [-0.6, 0.6, -0.6],
                  scale: [1, 1.01, 1],
                }
          }
          transition={reduce ? {} : { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <AvatarCharacter config={config} animationState="idle" size="xl" useAssets={false} />
        </motion.div>
      </motion.div>
    </div>
  )
}
