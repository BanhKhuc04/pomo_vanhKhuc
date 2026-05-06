import React from 'react'

export default function ProgressHeader({ step = 1, total = 3, title, subtitle }) {
  const pct = Math.max(0, Math.min(1, total ? step / total : 0))
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border-[3px] border-[#A9784A] bg-[#F6EBD3] px-3 py-2 shadow-[0_4px_0_#D7B680]">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#7BAE73]" />
            <span className="pixel-text text-[9px] uppercase tracking-[0.18em] text-[#8B5E34]">
              Step {step} of {total}
            </span>
          </div>
          <div className="mt-4 retro-text text-[42px] leading-[0.95] text-[#4B3425] sm:text-[52px]">
            {title}
          </div>
          <div className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#6D5640] sm:text-[16px]">
            {subtitle}
          </div>
        </div>
        <div className="w-full max-w-[220px] rounded-[22px] border-[3px] border-[#A9784A] bg-[#FFF7E8] px-4 py-3 shadow-[0_6px_0_#D7B680]">
          <div className="flex items-center justify-between gap-3">
            <span className="pixel-text text-[10px] uppercase tracking-[0.12em] text-[#8B5E34]">Journey</span>
            <span className="pixel-text text-[10px] uppercase tracking-[0.12em] text-[#5F8F5B]">{Math.round(pct * 100)}%</span>
          </div>
          <div className="mt-2 rounded-full border-[3px] border-[#A9784A] bg-[#F2E2C4] p-1 shadow-[inset_0_2px_0_rgba(255,255,255,0.6)]">
            <div className="h-3 rounded-full bg-[#D9C5A0]">
              <div
                className="h-full rounded-full border-r-[3px] border-[#6E9F61] bg-[linear-gradient(90deg,#A8C686_0%,#E7C66B_62%,#7DA8D6_100%)]"
                style={{ width: `${pct * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
