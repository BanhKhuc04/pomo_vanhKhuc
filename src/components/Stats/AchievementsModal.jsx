import React from 'react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { Lock, Trophy, X } from 'lucide-react'
import { ACHIEVEMENTS } from '../../data/achievements'
import { usePomo } from '../../context/PomoContext'
import { getAchievementCopy } from '../../data/translations'

const BADGE_TONES = {
  pink: { glow: 'rgba(236,72,153,0.28)', border: '#EC4899' },
  violet: { glow: 'rgba(124,92,255,0.28)', border: '#8A6FFC' },
  sky: { glow: 'rgba(56,189,248,0.28)', border: '#38BDF8' },
  amber: { glow: 'rgba(251,191,36,0.24)', border: '#FBBF24' },
  blue: { glow: 'rgba(37,99,235,0.24)', border: '#2563EB' },
  green: { glow: 'rgba(34,197,94,0.22)', border: '#22C55E' },
}

function AchievementCard({ achievement, unlocked, name, description, t }) {
  const tone = BADGE_TONES[achievement.badgeTone] || BADGE_TONES.violet
  const icon = unlocked ? achievement.icon || achievement.emoji : achievement.lockedIcon || '🔒'

  return (
    <article
      className={clsx(
        'rounded-2xl border p-4 transition-all',
        unlocked ? 'opacity-100' : 'opacity-75'
      )}
      style={{
        borderColor: unlocked ? tone.border : 'var(--app-card-border)',
        background: unlocked
          ? 'linear-gradient(180deg, color-mix(in srgb, var(--app-panel-soft) 88%, transparent 12%) 0%, color-mix(in srgb, var(--app-panel-deep) 92%, transparent 8%) 100%)'
          : 'linear-gradient(180deg, color-mix(in srgb, var(--app-panel-deep) 92%, transparent 8%) 0%, color-mix(in srgb, var(--app-bg-elevated) 96%, transparent 4%) 100%)',
        boxShadow: unlocked ? `0 14px 30px ${tone.glow}, inset 0 0 0 1px rgba(255,255,255,0.05)` : 'inset 0 0 0 1px rgba(255,255,255,0.03)',
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="h-14 w-14 shrink-0 rounded-2xl border flex items-center justify-center text-2xl"
          style={{
            borderColor: unlocked ? tone.border : 'var(--app-card-border)',
            background: unlocked ? 'var(--app-panel-soft)' : 'var(--app-panel-deep)',
            boxShadow: unlocked ? `0 0 14px ${tone.glow}` : 'none',
            filter: unlocked ? 'none' : 'grayscale(0.15)',
          }}
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="pixel-text text-[9px] sm:text-[10px] uppercase tracking-[0.08em] app-main-text">{name}</h4>
              <p className="retro-text mt-2 text-[18px] leading-[1.12] app-muted">{description}</p>
            </div>

            <div
              className="shrink-0 rounded-full border px-2.5 py-1 pixel-text text-[8px] uppercase"
              style={{
                borderColor: unlocked ? tone.border : 'var(--app-card-border)',
                background: unlocked ? 'var(--app-panel-soft)' : 'var(--app-panel-deep)',
                color: unlocked ? 'var(--app-text-main)' : 'var(--app-text-soft)',
              }}
            >
              {unlocked ? t('stats.unlockedState') : t('stats.lockedState')}
            </div>
          </div>

          {!unlocked ? (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-[12px]" style={{ borderColor: 'var(--app-card-border)', background: 'var(--app-panel-deep)', color: 'var(--app-text-soft)' }}>
              <Lock size={12} />
              <span className="pixel-text text-[8px] uppercase">{t('stats.keepFocusing')}</span>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default function AchievementsModal({ isOpen, onClose }) {
  const { isAchievementUnlocked, unlockedCount, locale, t } = usePomo()
  const totalCount = ACHIEVEMENTS.length
  const completion = totalCount > 0 ? unlockedCount / totalCount : 0

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[220] flex items-center justify-center p-4"
          style={{ background: 'var(--app-overlay)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 12, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            onClick={(event) => event.stopPropagation()}
            className="app-modal-shell w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-[30px]"
          >
            <div className="app-modal-header flex items-center justify-between px-5 py-4">
              <div>
                <h2 className="pixel-text text-[12px] uppercase tracking-[0.11em] app-main-text">{t('stats.achievementsTitle')}</h2>
                <p className="retro-text text-[19px] leading-none app-muted mt-1">{t('stats.achievementsSubtitle')}</p>
              </div>
              <button
                onClick={onClose}
                className="app-secondary-btn w-10 h-10 rounded-xl flex items-center justify-center"
                aria-label={t('stats.closeAchievements')}
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 lg:p-5 overflow-y-auto max-h-[calc(92vh-148px)] custom-scrollbar">
              <section className="app-section-card rounded-2xl p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border text-xl" style={{ borderColor: 'var(--app-primary-btn-border)', background: 'var(--app-panel-soft)', boxShadow: '0 0 16px var(--app-glow)' }}>
                      <Trophy size={24} style={{ color: 'var(--app-warm)' }} />
                    </div>
                    <div>
                      <div className="retro-text text-[28px] leading-none app-main-text">{t('stats.unlocked', { count: `${unlockedCount}/${totalCount}` })}</div>
                      <div className="retro-text mt-1 text-[18px] leading-none app-muted">{t('stats.keepBuilding')}</div>
                    </div>
                  </div>

                  <div className="w-full max-w-[260px]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="pixel-text text-[8px] uppercase app-kicker">{t('stats.progress')}</span>
                      <span className="pixel-text text-[8px] uppercase app-main-text">{Math.round(completion * 100)}%</span>
                    </div>
                    <div className="app-inline-surface h-2.5 rounded-full overflow-hidden shadow-[inset_0_2px_8px_rgba(2,4,14,0.2)]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.max(6, Math.round(completion * 100))}%`,
                          background: 'linear-gradient(90deg, var(--app-accent) 0%, var(--app-warm) 100%)',
                          boxShadow: '0 0 10px var(--app-glow)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </section>

              <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                {ACHIEVEMENTS.map((achievement) => {
                  const copy = getAchievementCopy(locale, achievement.id)
                  return (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    unlocked={isAchievementUnlocked(achievement.id)}
                    name={copy.name}
                    description={copy.description}
                    t={t}
                  />
                  )
                })}
              </div>
            </div>

            <div className="app-footer-bar px-5 py-4 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="app-secondary-btn rounded-xl px-4 py-2 pixel-text text-[8px] uppercase"
              >
                {t('common.close')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
