import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePomo } from '../../context/PomoContext'
import { GARDEN_SIZE, PLANT_STAGES } from '../../data/constants'
import { IMAGES } from '../../data/images'

export default function Garden() {
  const { garden } = usePomo()
  const plots = garden.plots || Array(GARDEN_SIZE).fill(PLANT_STAGES.EMPTY)
  const grown = plots.filter(p => p > PLANT_STAGES.EMPTY).length

  return (
    <div
      className="dashboard-card shrink-0 flex flex-col overflow-hidden"
      style={{ minHeight: 220, maxHeight: 265 }}
    >

      {/* Header */}
      <div className="px-5 py-3 border-b border-panelBorder/35 flex items-center justify-between shrink-0 bg-gradient-to-r from-[#1A153A] to-[#15112E]">
        <h3 className="dashboard-title flex items-center gap-2">
          <span className="text-emerald-400">🌱</span> GARDEN REWARDS
        </h3>
        <span className="pixel-text text-[8px] text-[#CBC2EA] opacity-90 tracking-tight">{grown}/{GARDEN_SIZE} collected</span>
      </div>

      {/* Grid — 6 or 7 cols, small cells */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 custom-scrollbar">
        <div className="grid grid-cols-7 gap-2 h-full content-start">
          {plots.map((stage, i) => (
            <div
              key={i}
              className="aspect-square border rounded-md flex items-center justify-center relative overflow-hidden transition-all duration-300"
              style={{
                background: stage > PLANT_STAGES.EMPTY
                  ? 'linear-gradient(180deg,#1A1E46 0%,#101430 100%)'
                  : 'linear-gradient(180deg,rgba(19,15,40,0.62) 0%, rgba(13,10,28,0.78) 100%)',
                borderColor: stage > PLANT_STAGES.EMPTY ? '#4D6FB3' : '#3A345E',
                boxShadow: stage > PLANT_STAGES.EMPTY
                  ? 'inset 0 0 0 1px rgba(145,183,255,0.25), 0 8px 18px rgba(4,8,26,0.45)'
                  : 'inset 0 0 0 1px rgba(81,70,125,0.2)',
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
                    className="w-full h-full p-1 flex items-center justify-center"
                  >
                    <img
                      src={IMAGES[i]}
                      alt={`Reward ${i + 1}`}
                      className="w-full h-full object-contain pixelated drop-shadow-[0_0_6px_rgba(130,203,255,0.35)]"
                      onError={(e) => { e.target.src = '/favicon.svg'; e.target.onerror = null }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="locked"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className="w-full h-full flex items-center justify-center opacity-70 grayscale"
                  >
                    <span className="text-[13px] leading-none">🔒</span>
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
