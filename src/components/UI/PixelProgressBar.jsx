import React from 'react'
import clsx from 'clsx'

/**
 * Pixel chunk progress bar.
 * Shows N chunks filled based on progress 0–1.
 */
export default function PixelProgressBar({ progress = 0, chunks = 19, color = 'violet', className = '' }) {
  const filled = Math.round(progress * chunks)
  const colors = {
    violet: 'bg-vio',
    orange: 'bg-orange dark:bg-amber',
    mint:   'bg-mint dark:bg-emerald-400',
    pink:   'bg-neonPink',
    blue:   'bg-indigoDark',
    amber:  'bg-amber',
  }
  return (
    <div className={clsx('border-2 border-panelBorder no-rounded bg-panelDeep p-[3px] flex gap-[2px] w-full', className)}>
      {Array.from({ length: chunks }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            'flex-1 h-3 sm:h-4 transition-colors duration-300',
            i < filled ? (colors[color] ?? colors.violet) : 'bg-panelBorder/30'
          )}
        />
      ))}
    </div>
  )
}
