import React from 'react'
import { usePomo } from '../../context/PomoContext'
import { ACHIEVEMENTS } from '../../data/achievements'

const PREVIEW_BADGES = ['🏆', '⭐', '🌙', '⚔️', '📖', '🌻']

export default function AchievementsSummary() {
  const { unlockedCount, t } = usePomo()
  const achievementsTotal = ACHIEVEMENTS.length
  const completion = achievementsTotal > 0 ? unlockedCount / achievementsTotal : 0

  return (
    <div className="dashboard-card shrink-0 overflow-hidden min-h-[144px]">
      <div className="app-modal-header px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="dashboard-title flex items-center gap-2">
            <span style={{ color: 'var(--app-warm)' }}>🏆</span>
            <span>{t('stats.achievementsTitle')}</span>
          </h3>
          <p className="retro-text mt-1 text-[15px] leading-none app-muted">{t('stats.achievementsSubtitle')}</p>
        </div>
        <div className="rounded-full border px-3 py-1.5 pixel-text text-[8px]" style={{ borderColor: 'var(--app-card-border)', color: 'var(--app-kicker)', background: 'var(--app-panel-deep)' }}>
          {unlockedCount}/{achievementsTotal}
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <div className="retro-text text-[20px] leading-none app-main-text">{t('stats.unlocked', { count: unlockedCount })}</div>
            <div className="retro-text mt-1 text-[14px] leading-none app-muted">{t('stats.toGo', { count: achievementsTotal - unlockedCount })}</div>
          </div>
          <div className="pixel-text text-[8px] app-kicker">{t('stats.goals', { count: unlockedCount, total: achievementsTotal })}</div>
        </div>

        <div className="mt-3 h-2.5 rounded-full overflow-hidden app-inline-surface shadow-[inset_0_2px_8px_rgba(2,4,14,0.2)]">
          <div
            className="h-full rounded-full"
            style={{
              width: `${Math.max(6, Math.round(completion * 100))}%`,
              background: 'linear-gradient(90deg, var(--app-accent) 0%, var(--app-warm) 100%)',
              boxShadow: '0 0 10px var(--app-glow)',
            }}
          />
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {PREVIEW_BADGES.map((icon, index) => {
            const lit = index < unlockedCount
            return (
              <div
                key={`${icon}-${index}`}
                className="h-8 rounded-lg border flex items-center justify-center text-sm transition-opacity"
                style={{
                  background: lit ? 'var(--app-panel-soft)' : 'var(--app-panel-deep)',
                  borderColor: lit ? 'var(--app-primary-btn-border)' : 'var(--app-card-border)',
                  opacity: lit ? 1 : 0.45,
                  boxShadow: lit ? '0 0 12px var(--app-glow)' : 'none',
                }}
              >
                {icon}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
