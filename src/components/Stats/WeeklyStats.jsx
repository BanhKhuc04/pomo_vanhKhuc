import React from 'react'
import { usePomo } from '../../context/PomoContext'
import { formatDuration } from '../../utils/helpers'
import { LANGUAGE_OPTIONS } from '../../data/constants'

export default function WeeklyStats() {
  const { dailyStats, settings, t } = usePomo()
  const currentLanguage = LANGUAGE_OPTIONS.find((item) => item.id === settings.locale) || LANGUAGE_OPTIONS[0]

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().split('T')[0]
  })

  const statsList = last7Days.map(date => {
    const d = new Date(date + 'T12:00:00')
    const dayName = d.toLocaleDateString(currentLanguage.locale, { weekday: 'short' }).toUpperCase()
    const s = dailyStats[date] || { pomos: 0, minutes: 0 }
    return { date, dayName, ...s }
  })

  const totalPomos   = statsList.reduce((a, c) => a + c.pomos,   0)
  const totalMinutes = statsList.reduce((a, c) => a + c.minutes, 0)
  const maxPomos     = Math.max(...statsList.map(s => s.pomos), 1)

  return (
    <div className="dashboard-card shrink-0 p-4">
      <h3 className="dashboard-title mb-3 flex items-center gap-2">
        <span style={{ color: 'var(--app-accent)' }}>📶</span> {t('stats.weeklyTitle')}
      </h3>

      {/* Totals row */}
      <div className="grid grid-cols-2 gap-3 mb-3.5">
        <div>
          <div className="retro-text text-[13px] leading-none uppercase opacity-80 app-muted">{t('stats.totalTime')}</div>
          <div className="retro-text text-[21px] leading-none app-main-text mt-1">{formatDuration(totalMinutes)}</div>
        </div>
        <div className="text-right min-w-0">
          <div className="retro-text text-[13px] leading-none uppercase opacity-80 app-muted">{t('stats.weeklyPomos')}</div>
          <div className="retro-text text-[21px] leading-none mt-1" style={{ color: 'var(--app-warm)' }}>{totalPomos}</div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex justify-between items-end gap-2 h-[92px]">
        {statsList.map((stat, i) => {
          const isToday  = i === 6
          const heightPct = (stat.pomos / maxPomos) * 100
          return (
            <div key={stat.date} className="flex flex-col items-center gap-1.5 flex-1">
              <div className="relative w-full rounded-md overflow-hidden flex items-end border" style={{ height: 56, background: 'var(--app-panel-deep)', borderColor: 'var(--app-card-border)' }}>
                <div
                  className="w-full transition-all duration-700 ease-out"
                  style={{
                    height: `${heightPct}%`,
                    minHeight: stat.pomos > 0 ? 4 : 0,
                    background: isToday
                      ? 'linear-gradient(180deg,var(--app-warm) 0%, #F4B729 100%)'
                      : 'linear-gradient(180deg, rgba(154,120,255,0.78) 0%, rgba(103,74,210,0.84) 100%)',
                    boxShadow: isToday ? '0 0 10px rgba(251, 191, 36, 0.24)' : 'none',
                  }}
                />
              </div>
              <span className="pixel-text text-[7px] uppercase tracking-tighter" style={{ color: isToday ? 'var(--app-warm)' : 'var(--app-text-muted)', opacity: isToday ? 1 : 0.75 }}>
                {stat.dayName}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
