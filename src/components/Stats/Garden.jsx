import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePomo } from '../../context/PomoContext'
import { GARDEN_SIZE, PLANT_STAGES } from '../../data/constants'
import { IMAGES } from '../../data/images'

export default function Garden() {
  const { garden } = usePomo()
  const plots = garden.plots || Array(GARDEN_SIZE).fill(PLANT_STAGES.EMPTY)
  const grown = plots.filter(p => p > PLANT_STAGES.EMPTY).length
  const isComplete = grown === GARDEN_SIZE

  return (
    <div className="flex-1 min-h-0 border border-panelBorder rounded-xl flex flex-col bg-panel/40 overflow-hidden">

      {/* Header */}
      <div className="px-4 py-3 border-b border-panelBorder/30 flex items-center justify-between shrink-0">
        <h3 className="pixel-text text-[10px] text-textMain uppercase tracking-widest flex items-center gap-2">
          <span className="text-emerald-400">🌱</span> Garden Rewards
        </h3>
        <span className="pixel-text text-[8px] text-textMuted opacity-60 tracking-tighter">{grown}/{GARDEN_SIZE} collected</span>
      </div>

      {/* Grid — 6 or 7 cols, small cells */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 custom-scrollbar">
        <div className="grid grid-cols-6 gap-2 h-full content-start">
          {plots.map((stage, i) => (
            <div
              key={i}
              className="aspect-square border rounded-md flex items-center justify-center relative overflow-hidden transition-all duration-300"
              style={{
                background: stage > PLANT_STAGES.EMPTY ? '#0F0C1B' : 'rgba(15, 12, 27, 0.3)',
                borderColor: stage > PLANT_STAGES.EMPTY ? '#22C55E40' : '#2A244A',
              }}
              title={stage > PLANT_STAGES.EMPTY ? `Reward #${i + 1}` : 'Locked'}
            >
              <AnimatePresence mode="wait">
                {stage > PLANT_STAGES.EMPTY ? (
                  <motion.div
                    key="bloomed"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    className="w-full h-full p-1.5 flex items-center justify-center"
                  >
                    <img
                      src={IMAGES[i]}
                      alt={`Reward ${i + 1}`}
                      className="w-full h-full object-contain pixelated drop-shadow-[0_0_5px_rgba(34,197,94,0.3)]"
                      onError={(e) => { e.target.src = '/favicon.svg'; e.target.onerror = null }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="locked"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className="w-full h-full flex items-center justify-center opacity-40 grayscale"
                  >
                    <span className="text-[12px]">🔒</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
