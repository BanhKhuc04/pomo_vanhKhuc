import React from 'react'
import { usePomo } from '../../context/PomoContext'
import { formatDuration } from '../../utils/helpers'

export default function WeeklyStats() {
  const { dailyStats } = usePomo()

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().split('T')[0]
  })

  const statsList = last7Days.map(date => {
    const d = new Date(date + 'T12:00:00')
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
    const s = dailyStats[date] || { pomos: 0, minutes: 0 }
    return { date, dayName, ...s }
  })

  const totalPomos   = statsList.reduce((a, c) => a + c.pomos,   0)
  const totalMinutes = statsList.reduce((a, c) => a + c.minutes, 0)
  const maxPomos     = Math.max(...statsList.map(s => s.pomos), 1)

  return (
    <div className="shrink-0 border border-panelBorder p-4 rounded-xl bg-panel/40">
      <h3 className="pixel-text text-[10px] text-textMain uppercase tracking-widest mb-3 flex items-center gap-2">
        <span className="text-vio">📊</span> Weekly Stats
      </h3>

      {/* Totals row */}
      <div className="flex justify-between mb-4">
        <div>
          <div className="retro-text text-xs text-textMuted uppercase opacity-70">Total Focus Time</div>
          <div className="retro-text text-lg text-textMain">{formatDuration(totalMinutes)}</div>
        </div>
        <div className="text-right">
          <div className="retro-text text-xs text-textMuted uppercase opacity-70">Pomodoros</div>
          <div className="retro-text text-lg text-amber">{totalPomos} <span className="text-sm">🍅</span></div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex justify-between items-end gap-1.5 h-16">
        {statsList.map((stat, i) => {
          const isToday  = i === 6
          const heightPct = (stat.pomos / maxPomos) * 100
          return (
            <div key={stat.date} className="flex flex-col items-center gap-2 flex-1">
              <div className="relative w-full bg-panelDeep/50 rounded-sm overflow-hidden flex items-end" style={{ height: 48 }}>
                <div
                  className="w-full transition-all duration-700 ease-out"
                  style={{
                    height: `${heightPct}%`,
                    minHeight: stat.pomos > 0 ? 4 : 0,
                    background: isToday
                      ? '#FBBF24'
                      : 'rgba(139, 92, 246, 0.4)',
                    boxShadow: isToday ? '0 0 10px rgba(251, 191, 36, 0.3)' : 'none',
                  }}
                />
              </div>
              <span className={`pixel-text text-[7px] uppercase tracking-tighter ${isToday ? 'text-amber font-bold' : 'text-textMuted opacity-60'}`}>
                {stat.dayName}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
