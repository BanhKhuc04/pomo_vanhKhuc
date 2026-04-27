import React from 'react'
import clsx from 'clsx'

const VARIANTS = {
  primary: 'bg-orange text-ink hover:bg-orangeDark dark:bg-nightAccent dark:text-cream dark:hover:bg-blue-500',
  secondary: 'bg-mint text-ink hover:bg-emerald-300 dark:bg-purple-700 dark:text-cream dark:hover:bg-purple-600',
  danger: 'bg-pink text-ink hover:bg-red-300 dark:bg-rose-700 dark:text-cream',
  ghost: 'bg-cream text-ink hover:bg-wood/40 dark:bg-nightCard dark:text-cream dark:hover:bg-purple-800',
  wood: 'bg-wood text-ink hover:bg-woodDark dark:bg-woodDark dark:text-cream'
}

const SIZES = {
  sm: 'px-3 py-1 text-xs min-h-[36px]',
  md: 'px-4 py-2 text-sm min-h-[44px]',
  lg: 'px-6 py-3 text-base min-h-[52px]',
  icon: 'w-11 h-11 p-0 min-w-[44px]'
}

export default function PixelButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  active = false,
  disabled = false,
  onClick,
  type = 'button',
  ariaLabel,
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={clsx(
        'pixel-text no-rounded pixel-border pixel-shadow font-bold uppercase tracking-wider',
        'transition-all duration-100 ease-out',
        'active:translate-x-[2px] active:translate-y-[2px] active:shadow-pixel-sm',
        'flex items-center justify-center gap-2 whitespace-nowrap',
        VARIANTS[variant],
        SIZES[size],
        active && 'translate-x-[2px] translate-y-[2px] shadow-pixel-sm ring-2 ring-orangeDark dark:ring-star',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
