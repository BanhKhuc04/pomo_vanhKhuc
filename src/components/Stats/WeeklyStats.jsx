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
    <div className="dashboard-card shrink-0 p-4 lg:min-h-[204px]">
      <h3 className="dashboard-title mb-3 flex items-center gap-2">
        <span className="text-vio">📶</span> WEEKLY STATS
      </h3>

      {/* Totals row */}
      <div className="flex justify-between mb-3.5">
        <div>
          <div className="retro-text text-[16px] leading-none text-textMuted uppercase opacity-80">Total Time</div>
          <div className="retro-text text-[26px] leading-none text-textMain mt-1">{formatDuration(totalMinutes)}</div>
        </div>
        <div className="text-right">
          <div className="retro-text text-[16px] leading-none text-textMuted uppercase opacity-80">Pomodoros</div>
          <div className="retro-text text-[26px] leading-none text-amber mt-1">{totalPomos}</div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex justify-between items-end gap-2 h-[92px]">
        {statsList.map((stat, i) => {
          const isToday  = i === 6
          const heightPct = (stat.pomos / maxPomos) * 100
          return (
            <div key={stat.date} className="flex flex-col items-center gap-1.5 flex-1">
              <div className="relative w-full bg-panelDeep/50 rounded-md overflow-hidden flex items-end border border-panelBorder/50" style={{ height: 56 }}>
                <div
                  className="w-full transition-all duration-700 ease-out"
                  style={{
                    height: `${heightPct}%`,
                    minHeight: stat.pomos > 0 ? 4 : 0,
                    background: isToday
                      ? 'linear-gradient(180deg,#FACC56 0%,#F4B729 100%)'
                      : 'linear-gradient(180deg, rgba(154,120,255,0.78) 0%, rgba(103,74,210,0.84) 100%)',
                    boxShadow: isToday ? '0 0 10px rgba(251, 191, 36, 0.32)' : 'none',
                  }}
                />
              </div>
              <span className={`pixel-text text-[8px] uppercase tracking-tighter ${isToday ? 'text-amber font-bold' : 'text-textMuted opacity-75'}`}>
                {stat.dayName}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
