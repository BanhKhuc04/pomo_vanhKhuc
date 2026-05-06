import React from 'react'
import { usePomo } from '../../context/PomoContext'
import { formatDayCount } from '../../data/translations'

export default function StreakBadge({ compact = false }) {
  const { streak, locale } = usePomo()
  const count = streak.count || 0

  return (
    <div
      className={`inline-flex items-center rounded-lg border shadow-[inset_0_0_12px_rgba(251,191,36,0.14)] ${
        compact ? 'gap-1.5 px-2 py-1' : 'gap-2 px-3 py-1.5'
      }`}
      style={{
        borderColor: 'color-mix(in srgb, var(--app-warm) 45%, var(--app-card-border) 55%)',
        background: 'color-mix(in srgb, var(--app-panel-soft) 82%, transparent 18%)',
      }}
    >
      <span className={`leading-none ${compact ? 'text-[13px]' : 'text-[14px]'}`}>🔥</span>
      <span className={`pixel-text tracking-tight uppercase ${compact ? 'text-[9px]' : 'text-[10px]'}`} style={{ color: 'var(--app-warm)' }}>
        {formatDayCount(locale, count, compact)}
      </span>
    </div>
  )
}
