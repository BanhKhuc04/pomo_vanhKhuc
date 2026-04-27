import React from 'react'
import PixelCard from '../UI/PixelCard'
import { usePomo } from '../../context/PomoContext'
import { formatDuration } from '../../utils/helpers'
import { GARDEN_SIZE } from '../../data/constants'

const StatRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between gap-2 py-1.5 border-b-2 border-ink/10 dark:border-cream/10 last:border-b-0">
    <span className="retro-text text-base sm:text-lg flex items-center gap-2 text-ink dark:text-cream">
      <span className="text-xl">{icon}</span>
      {label}
    </span>
    <span className="pixel-text text-[10px] sm:text-xs text-ink dark:text-star">
      {value}
    </span>
  </div>
)

export default function StatsPanel() {
  const { stats, garden, streak } = usePomo()
  const grownCount = (garden.plots || []).filter(p => p > 0).length

  return (
    <PixelCard accent="lavender" title="📊 Today's Stats">
      <div className="space-y-1">
        <StatRow icon="🍅" label="Pomodoros" value={`${stats.todayPomos}/${GARDEN_SIZE}`} />
        <StatRow icon="⏱️" label="Focus Time" value={formatDuration(stats.todayMinutes)} />
        <StatRow icon="🌱" label="Plants Grown" value={`${grownCount}/${GARDEN_SIZE}`} />
        <StatRow icon="🏆" label="All-Time" value={`${stats.totalPomos}`} />
        <StatRow icon="🔥" label="Streak" value={`${streak.count} ${streak.count === 1 ? 'day' : 'days'}`} />
      </div>
    </PixelCard>
  )
}
