import React from 'react'
import { usePomo } from '../../context/PomoContext'
import { formatDuration } from '../../utils/helpers'
import { GARDEN_SIZE } from '../../data/constants'
import { formatDayCount } from '../../data/translations'
import UserAvatar from '../Profile/UserAvatar'

const StatRow = ({ icon, label, value, valueColor }) => (
  <div className="flex items-center justify-between py-1.5 border-b last:border-0" style={{ borderColor: 'var(--app-card-border)' }}>
    <span className="retro-text text-[15px] sm:text-[16px] leading-none flex items-center gap-2 app-main-text">
      <span className="text-[14px]">{icon}</span>
      <span className="opacity-95">{label}</span>
    </span>
    <span className="pixel-text text-[8px]" style={{ color: valueColor || 'var(--app-text-main)' }}>{value}</span>
  </div>
)

export default function StatsPanel() {
  const { stats, garden, streak, profile, locale, t } = usePomo()
  const grownCount = (garden.plots || []).filter(p => p > 0).length

  return (
    <div className="dashboard-card shrink-0 p-3.5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="dashboard-title flex items-center gap-2">
            <span style={{ color: 'var(--app-accent)' }}>📊</span>
            <span>{t('stats.todayTitle')}</span>
          </h3>
          <p className="retro-text mt-1 text-[15px] leading-none app-muted">{t('stats.todaySubtitle')}</p>
        </div>
      </div>

      {profile ? (
        <div className="app-inline-surface mb-3 flex items-center gap-3 rounded-xl px-3 py-2.5">
          <UserAvatar profile={profile} size="sm" className="h-11 w-11 rounded-[14px]" />
          <div className="min-w-0">
            <div className="pixel-text text-[8px] uppercase app-kicker">{t('stats.currentProfile')}</div>
            <div className="retro-text mt-1 truncate text-[17px] leading-none app-main-text">{profile.displayName}</div>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col">
        <StatRow icon="🍅" label={t('stats.pomodoros')} value={`${stats.todayPomos} / ${GARDEN_SIZE}`} />
        <StatRow icon="⏱️" label={t('stats.focusTime')} value={formatDuration(stats.todayMinutes)} />
        <StatRow icon="🌱" label={t('stats.plantsGrown')} value={`${grownCount} / ${GARDEN_SIZE}`} />
        <StatRow icon="🔥" label={t('stats.streak')} value={formatDayCount(locale, streak.count)} valueColor="var(--app-warm)" />
      </div>
    </div>
  )
}
