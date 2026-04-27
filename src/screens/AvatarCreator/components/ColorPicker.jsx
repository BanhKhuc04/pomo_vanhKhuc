import React from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'

export default function ColorPicker({ value, options, onChange, variant = 'swatch' }) {
  if (!options || options.length === 0) return null

  if (variant === 'pill') {
    return (
      <div className="flex gap-2 overflow-x-auto pb-1">
        {options.map(o => {
          const selected = value === o.id
          return (
            <motion.button
              key={o.id}
              onClick={() => onChange(o.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={clsx(
                'shrink-0 rounded-full px-3 py-2 border text-[13px] font-semibold transition-colors',
                selected ? 'border-white/40 bg-white/15 text-white' : 'border-white/10 bg-white/5 text-white/70'
              )}
            >
              <span className="inline-flex items-center gap-2">
                <span
                  className={clsx(
                    'w-4 h-4 rounded-full border',
                    selected ? 'border-white/60' : 'border-white/20'
                  )}
                  style={{ background: o.hex }}
                />
                {o.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {options.map(o => {
        const selected = value === o.id
        return (
          <motion.button
            key={o.id}
            onClick={() => onChange(o.id)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="shrink-0 flex flex-col items-center gap-1.5"
            title={o.label}
          >
            <div
              className={clsx(
                'w-11 h-11 rounded-2xl border shadow-[0_10px_30px_rgba(0,0,0,0.25)]',
                selected ? 'border-white/70' : 'border-white/15'
              )}
              style={{
                background: o.hex,
                boxShadow: selected
                  ? '0 0 0 6px rgba(124,58,237,0.22), 0 18px 45px rgba(0,0,0,0.35)'
                  : '0 14px 35px rgba(0,0,0,0.25)',
              }}
            />
            <div className={clsx('text-[12px] font-semibold', selected ? 'text-white/90' : 'text-white/55')}>
              {o.label}
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}

