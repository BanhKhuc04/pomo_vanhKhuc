import React from 'react'
import clsx from 'clsx'

export default function PixelSlider({
  label, value, onChange, min = 0, max = 100, step = 1, suffix = '', className = ''
}) {
  return (
    <div className={clsx('w-full', className)}>
      {label && (
        <div className="flex items-center justify-between mb-1">
          <span className="retro-text text-base sm:text-lg text-ink dark:text-cream">{label}</span>
          <span className="pixel-text text-[10px] text-ink dark:text-cream">{value}{suffix}</span>
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className={clsx(
          'w-full h-3 appearance-none cursor-pointer pixel-border no-rounded bg-wood/40 dark:bg-purple-900',
          '[&::-webkit-slider-thumb]:appearance-none',
          '[&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5',
          '[&::-webkit-slider-thumb]:bg-orange dark:[&::-webkit-slider-thumb]:bg-star',
          '[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-ink',
          '[&::-webkit-slider-thumb]:cursor-pointer',
          '[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5',
          '[&::-moz-range-thumb]:bg-orange dark:[&::-moz-range-thumb]:bg-star',
          '[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-ink',
          '[&::-moz-range-thumb]:rounded-none'
        )}
      />
    </div>
  )
}
