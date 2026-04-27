import React from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'

export default function OutfitSelector({ value, options, onChange }) {
  if (!options || options.length === 0) return null

  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {options.map(o => {
        const selected = value === o.id
        return (
          <motion.button
            key={o.id}
            onClick={() => onChange(o.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={clsx(
              'shrink-0 w-[138px] rounded-3xl border p-3 text-left transition-colors',
              selected ? 'border-white/40 bg-white/15' : 'border-white/10 bg-white/5'
            )}
            style={{
              boxShadow: selected ? '0 18px 45px rgba(124,58,237,0.18)' : '0 16px 40px rgba(0,0,0,0.25)',
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="text-[13px] font-extrabold tracking-tight text-white/90">{o.label}</div>
              <div className="text-[18px] opacity-80">{o.emoji}</div>
            </div>
            <div className="mt-2 h-10 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0" />
            <div className={clsx('mt-2 text-[12px] font-semibold', selected ? 'text-white/75' : 'text-white/55')}>
              {selected ? 'Selected' : 'Tap to try'}
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}

