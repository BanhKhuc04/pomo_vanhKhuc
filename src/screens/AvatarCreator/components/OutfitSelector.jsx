import React from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'

export default function OutfitSelector({ value, options, onChange, renderPreview }) {
  if (!options || options.length === 0) return null

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {options.map(o => {
        const selected = value === o.id
        return (
          <motion.button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            whileHover={{ y: -1, scale: 1.01 }}
            whileTap={{ y: 2, scale: 0.98 }}
            className={clsx(
              'rounded-[22px] border-[3px] p-3 text-left transition-colors shadow-[0_5px_0_#D7B680]',
              selected
                ? 'border-[#8B5E34] bg-[#FCE7B2] text-[#4B3425]'
                : 'border-[#D5B27B] bg-[#FFF7E8] text-[#6B4A2E]'
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="pixel-text text-[8px] uppercase tracking-[0.1em]">{o.label}</div>
              <div className="text-[18px] opacity-80">{o.emoji}</div>
            </div>
            <div className="mt-3 flex h-20 items-center justify-center rounded-[18px] border-[3px] border-[#D5B27B] bg-[linear-gradient(180deg,#DFF1FF_0%,#F8F3E7_100%)]">
              {typeof renderPreview === 'function' ? renderPreview(o) : <div className="h-10 w-10 rounded-xl bg-white/40" />}
            </div>
            <div className={clsx('mt-3 text-[13px]', selected ? 'text-[#5B6F42]' : 'text-[#7A6147]')}>
              {selected ? 'Wearing now' : 'Try this look'}
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
