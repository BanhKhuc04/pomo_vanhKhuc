import React from 'react'

export default function ProgressHeader({ step = 1, total = 3, title, subtitle }) {
  const pct = Math.max(0, Math.min(1, total ? step / total : 0))
  return (
    <div className="w-full">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-white/80 text-[12px] tracking-[0.18em] uppercase">
            Step {step} of {total}
          </div>
          <div className="mt-1 text-[26px] leading-[1.1] font-extrabold tracking-tight">
            {title}
          </div>
          <div className="mt-2 text-white/70 text-[15px] leading-snug">
            {subtitle}
          </div>
        </div>
        <div className="shrink-0 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
          <div className="text-white/80 text-[12px] font-semibold">{Math.round(pct * 100)}%</div>
          <div className="mt-1 w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full rounded-full"
                 style={{ width: `${pct * 100}%`, background: 'linear-gradient(90deg, #7C3AED 0%, #2563EB 100%)' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

