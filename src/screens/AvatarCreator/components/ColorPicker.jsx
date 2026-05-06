import React from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'

export default function ColorPicker({ value, options, onChange, variant = 'swatch' }) {
  if (!options || options.length === 0) return null

  if (variant === 'pill') {
    return (
      <div className="flex flex-wrap gap-2">
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
                'shrink-0 rounded-full border-[3px] px-3 py-2 text-left transition-colors shadow-[0_4px_0_#D7B680]',
                selected
                  ? 'border-[#8B5E34] bg-[#FCE7B2] text-[#4B3425]'
                  : 'border-[#D5B27B] bg-[#FFF7E8] text-[#6B4A2E]'
              )}
            >
              <span className="inline-flex items-center gap-2">
                <span
                  className={clsx(
                    'h-4 w-4 rounded-full border-[2px]',
                    selected ? 'border-[#8B5E34]' : 'border-[#D5B27B]'
                  )}
                  style={{ background: o.hex }}
                />
                <span className="pixel-text text-[8px] uppercase tracking-[0.08em]">{o.label}</span>
              </span>
            </motion.button>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-3">
      {options.map(o => {
        const selected = value === o.id
        return (
          <motion.button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ y: 2, scale: 0.98 }}
            className="shrink-0 flex flex-col items-center gap-2"
            title={o.label}
          >
            <div
              className={clsx(
                'relative h-14 w-14 rounded-[18px] border-[3px] shadow-[0_5px_0_#D7B680]',
                selected ? 'border-[#8B5E34]' : 'border-[#D5B27B]'
              )}
              style={{
                background: o.hex,
                boxShadow: selected
                  ? '0 0 0 4px rgba(231,198,107,0.45), 0 5px 0 #C89B6D'
                  : '0 5px 0 #D7B680',
              }}
            >
              <div className="absolute inset-1 rounded-[12px] border border-white/45 opacity-70" />
            </div>
            <div className={clsx('pixel-text text-[8px] uppercase tracking-[0.08em]', selected ? 'text-[#4B3425]' : 'text-[#7A6147]')}>
              {o.label}
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
