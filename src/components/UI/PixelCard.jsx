import React from 'react'
import clsx from 'clsx'

export default function PixelCard({ children, className = '', title, accent = 'cream', ...rest }) {
  const accents = {
    cream: 'bg-cream dark:bg-nightCard',
    wood: 'bg-wood/30 dark:bg-purple-900',
    pink: 'bg-pink dark:bg-rose-900/40',
    mint: 'bg-mint dark:bg-emerald-900/40',
    lavender: 'bg-lavender dark:bg-indigo-900/40'
  }
  return (
    <div
      className={clsx(
        'pixel-border pixel-shadow no-rounded p-4',
        accents[accent] || accents.cream,
        className
      )}
      {...rest}
    >
      {title && (
        <h3 className="pixel-text text-xs sm:text-sm mb-3 text-ink dark:text-cream uppercase tracking-widest">
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}
