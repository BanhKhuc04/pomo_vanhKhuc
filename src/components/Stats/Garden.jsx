import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PixelCard from '../UI/PixelCard'
import { usePomo } from '../../context/PomoContext'
import { GARDEN_SIZE, PLANT_STAGES } from '../../data/constants'
import { IMAGES } from '../../data/images'

export default function Garden() {
  const { garden } = usePomo()
  const plots = garden.plots || Array(GARDEN_SIZE).fill(PLANT_STAGES.EMPTY)
  const grown = plots.filter(p => p > PLANT_STAGES.EMPTY).length

  return (
    <PixelCard accent="mint" title="🌱 Garden Rewards">
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mb-3">
        {plots.map((stage, i) => (
          <div
            key={i}
            className="aspect-square pixel-border bg-wood/40 dark:bg-emerald-950 flex items-center justify-center relative overflow-hidden group"
            title={stage > PLANT_STAGES.EMPTY ? `Reward #${i + 1}` : 'Locked'}
          >
            <AnimatePresence mode="wait">
              {stage > PLANT_STAGES.EMPTY ? (
                <motion.div
                  key={stage}
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-full h-full p-1 flex items-center justify-center"
                >
                  <img 
                    src={IMAGES[i]} 
                    alt={`Garden plant ${i + 1}`}
                    className="w-full h-full object-contain pixelated hover:scale-110 transition-transform duration-200"
                  />
                </motion.div>
              ) : (
                <motion.span
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  className="text-base text-ink/40 dark:text-cream/30"
                >
                  ·
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="retro-text text-center text-base text-ink dark:text-cream">
        {grown}/{GARDEN_SIZE} items collected today
      </div>
    </PixelCard>
  )
}
