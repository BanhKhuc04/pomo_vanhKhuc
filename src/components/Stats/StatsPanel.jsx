import React from 'react'
import { usePomo } from '../../context/PomoContext'
import { formatDuration } from '../../utils/helpers'
import { GARDEN_SIZE } from '../../data/constants'

const StatRow = ({ icon, label, value, valueColor = 'text-textMain' }) => (
  <div className="flex items-center justify-between py-1.5 border-b border-panelBorder/30 last:border-0">
    <span className="retro-text text-[15px] text-textMuted flex items-center gap-2.5">
      <span className="text-base grayscale-[0.3] brightness-90">{icon}</span>
      <span className="opacity-90">{label}</span>
    </span>
    <span className={`pixel-text text-[9px] ${valueColor}`}>{value}</span>
  </div>
)

export default function StatsPanel() {
  const { stats, garden, streak } = usePomo()
  const grownCount = (garden.plots || []).filter(p => p > 0).length

  return (
    <div className="shrink-0 border border-panelBorder p-4 rounded-xl bg-panel/40">
      <h3 className="pixel-text text-[10px] text-textMain uppercase tracking-widest mb-3 flex items-center gap-2">
        <span className="text-vio">📊</span> Today's Stats
      </h3>
      <div className="flex flex-col">
        <StatRow icon="🍅" label="Pomodoros"   value={`${stats.todayPomos} / ${GARDEN_SIZE}`} />
        <StatRow icon="⏱️" label="Focus Time"  value={formatDuration(stats.todayMinutes)} />
        <StatRow icon="🌱" label="Plants Grown" value={`${grownCount} / ${GARDEN_SIZE}`} />
        <StatRow icon="🏆" label="All-Time"    value={stats.totalPomos} />
        <StatRow icon="🔥" label="Streak"       value={`${streak.count} ${streak.count === 1 ? 'day' : 'days'}`} valueColor="text-amber" />
      </div>
    </div>
  )
}
