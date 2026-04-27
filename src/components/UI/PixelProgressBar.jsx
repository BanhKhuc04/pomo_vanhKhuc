import React from 'react'
import clsx from 'clsx'

/**
 * Pixel chunk progress bar.
 * Shows N chunks filled based on progress 0-1.
 */
export default function PixelProgressBar({ progress = 0, chunks = 20, color = 'orange', className = '' }) {
  const filled = Math.round(progress * chunks)
  const colors = {
    orange: 'bg-orange dark:bg-star',
    mint: 'bg-mint dark:bg-emerald-400',
    pink: 'bg-pink dark:bg-rose-400',
    blue: 'bg-nightAccent'
  }
  return (
    <div className={clsx('pixel-border pixel-shadow-sm no-rounded bg-cream dark:bg-night p-1 flex gap-[2px] w-full', className)}>
      {Array.from({ length: chunks }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            'flex-1 h-4 sm:h-5 transition-colors duration-200',
            i < filled ? colors[color] : 'bg-wood/30 dark:bg-purple-900'
          )}
        />
      ))}
    </div>
  )
}
