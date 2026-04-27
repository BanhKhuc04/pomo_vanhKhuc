import React from 'react'
import clsx from 'clsx'

/**
 * PixelCard — dark-first panel card with violet pixel border.
 * accent variants preserved for backward-compat; dark mode now uses 
 * the new #211D3F panel palette with panelBorder.
 */
export default function PixelCard({ children, className = '', title, accent = 'cream', ...rest }) {
  const accents = {
    cream: 'bg-panel dark:bg-panel',
    wood: 'bg-wood/30 dark:bg-panelDeep',
    pink: 'bg-pink dark:bg-panel',
    mint: 'bg-mint dark:bg-panel',
    lavender: 'bg-lavender dark:bg-panel',
  }
  return (
    <div
      className={clsx(
        'pixel-border pixel-shadow no-rounded p-3',
        accents[accent] || accents.cream,
        className
      )}
      {...rest}
    >
      {title && (
        <h3 className="pixel-text text-[9px] sm:text-[10px] mb-2 text-textMain uppercase tracking-widest flex items-center gap-2">
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}
