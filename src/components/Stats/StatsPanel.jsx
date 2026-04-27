import React from 'react'
import { usePomo } from '../../context/PomoContext'
import { formatDuration } from '../../utils/helpers'
import { GARDEN_SIZE } from '../../data/constants'

const StatRow = ({ icon, label, value, valueColor = 'text-textMain' }) => (
  <div className="flex items-center justify-between py-1.5 border-b border-panelBorder/35 last:border-0">
    <span className="retro-text text-[19px] leading-none text-[#C7BEE8] flex items-center gap-2">
      <span className="text-[14px]">{icon}</span>
      <span className="opacity-95">{label}</span>
    </span>
    <span className={`pixel-text text-[9px] ${valueColor}`}>{value}</span>
  </div>
)

export default function StatsPanel() {
  const { stats, garden, streak } = usePomo()
  const grownCount = (garden.plots || []).filter(p => p > 0).length

  return (
    <div className="dashboard-card shrink-0 p-3.5">
      <h3 className="dashboard-title mb-2.5 flex items-center gap-2">
        <span className="text-vio">📊</span> TODAY'S STATS
      </h3>
      <div className="flex flex-col">
        <StatRow icon="🍅" label="Pomodoros"   value={`${stats.todayPomos} / ${GARDEN_SIZE}`} />
        <StatRow icon="⏱️" label="Focus Time"  value={formatDuration(stats.todayMinutes)} />
        <StatRow icon="🌱" label="Plants Grown" value={`${grownCount} / ${GARDEN_SIZE}`} />
        <StatRow icon="🔥" label="Streak"       value={`${streak.count} ${streak.count === 1 ? 'day' : 'days'}`} valueColor="text-amber" />
      </div>
    </div>
  )
}
