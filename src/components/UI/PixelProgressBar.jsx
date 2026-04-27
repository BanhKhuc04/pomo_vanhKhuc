import React from 'react'
import clsx from 'clsx'

/**
 * Pixel chunk progress bar.
 * Shows N chunks filled based on progress 0–1.
 */
export default function PixelProgressBar({ progress = 0, chunks = 19, color = 'violet', className = '' }) {
  const filled = Math.round(progress * chunks)
  const colors = {
    violet: 'bg-[#6E42F1]',
    orange: 'bg-orange',
    mint:   'bg-[#35D36E]',
    pink:   'bg-[#F04FA3]',
    blue:   'bg-indigoDark',
    amber:  'bg-[#FFC640]',
  }
  return (
    <div className={clsx('border border-[#5A4B95] rounded-xl bg-[#0F1129] p-[5px] flex gap-[3px] w-full shadow-[0_0_0_1px_rgba(107,87,189,0.24),inset_0_2px_10px_rgba(2,4,14,0.75)]', className)}>
      {Array.from({ length: chunks }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            'flex-1 h-6 rounded-[4px] transition-all duration-300',
            i < filled ? (colors[color] ?? colors.violet) : 'bg-[#2A2450]'
          )}
          style={i < filled ? { boxShadow: '0 0 9px rgba(122,92,255,0.32)' } : { boxShadow: 'inset 0 0 0 1px rgba(78,68,128,0.2)' }}
        />
      ))}
    </div>
  )
}
