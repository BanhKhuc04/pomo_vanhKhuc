import React from 'react'
import clsx from 'clsx'

const VARIANTS = {
  primary:   'bg-vio text-white hover:bg-vioDark border-vio',
  secondary: 'bg-panel text-textMain hover:bg-panelDeep border-panelBorder',
  danger:    'bg-neonPink/80 text-white hover:bg-neonPink border-neonPink',
  ghost:     'bg-panel text-textMuted hover:bg-panelDeep border-panelBorder hover:text-textMain',
  wood:      'bg-panelDeep text-textMuted hover:bg-panel border-panelBorder hover:text-textMain',
  amber:     'bg-amber text-panelDeep hover:bg-amber/80 border-amber',
}

const SIZES = {
  sm:   'px-3 py-1 text-xs min-h-[32px]',
  md:   'px-4 py-2 text-sm min-h-[40px]',
  lg:   'px-6 py-3 text-base min-h-[48px]',
  icon: 'w-9 h-9 p-0 min-w-[36px]',
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
        'pixel-text no-rounded border-2 font-bold uppercase tracking-wider',
        'transition-all duration-100 ease-out',
        'active:translate-x-[2px] active:translate-y-[2px]',
        'flex items-center justify-center gap-2 whitespace-nowrap',
        VARIANTS[variant],
        SIZES[size],
        active && 'bg-vio text-white border-vio translate-x-[2px] translate-y-[2px]',
        disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
