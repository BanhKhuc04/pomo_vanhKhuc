import React from 'react'
import clsx from 'clsx'

export default function PixelToggle({ checked, onChange, label, className = '' }) {
  return (
    <label className={clsx('flex items-center justify-between gap-3 cursor-pointer', className)}>
      {label && (
        <span className="retro-text text-base sm:text-lg text-ink dark:text-cream flex-1">
          {label}
        </span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={clsx(
          'pixel-border pixel-shadow-sm no-rounded relative w-14 h-7 transition-colors duration-150',
          checked ? 'bg-mint dark:bg-emerald-600' : 'bg-wood/40 dark:bg-purple-900'
        )}
      >
        <span
          className={clsx(
            'absolute top-[2px] w-5 h-5 pixel-border bg-cream dark:bg-cream transition-all duration-150',
            checked ? 'left-[28px]' : 'left-[2px]'
          )}
        />
      </button>
    </label>
  )
}
