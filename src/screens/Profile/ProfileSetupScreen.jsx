import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Check, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { usePomo } from '../../context/PomoContext'
import UserAvatar from '../../components/Profile/UserAvatar'
import { applyAvatarBase, DEFAULT_PROFILE, normalizeProfile } from '../../data/profileDefaults'
import { getAvatarBaseMeta, PROFILE_AVATAR_BASES } from '../../data/presetAvatars'
import { createTranslator } from '../../data/translations'
import { LANGUAGE_OPTIONS } from '../../data/constants'

function AvatarBaseCard({ option, selected, onClick, label, description }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'relative rounded-2xl border p-3 text-left transition-all',
        selected
          ? 'shadow-[0_10px_24px_rgba(76,53,184,0.28),inset_0_0_0_1px_rgba(138,111,252,0.24)]'
          : ''
      )}
      style={{
        borderColor: selected ? 'var(--app-primary-btn-border)' : 'var(--app-card-border)',
        background: selected ? 'linear-gradient(180deg, var(--app-accent-soft) 0%, var(--app-panel-deep) 100%)' : 'var(--app-panel-soft)',
      }}
    >
      <div className="flex items-center gap-3">
        <div className="app-inline-surface h-16 w-16 overflow-hidden rounded-xl">
          <img src={option.src} alt={label} className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0">
          <div className="pixel-text text-[8px] uppercase tracking-[0.1em] app-main-text">{label}</div>
          <div className="retro-text mt-1 text-[18px] leading-none app-muted">{description}</div>
        </div>
      </div>
      {selected ? (
        <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border text-white shadow-[0_8px_20px_rgba(76,53,184,0.4)]" style={{ borderColor: 'var(--app-primary-btn-border)', background: 'var(--app-accent)' }}>
          <Check size={14} />
        </span>
      ) : null}
    </button>
  )
}

export default function ProfileSetupScreen({ initial, onSave }) {
  const { locale, settings, setSettings } = usePomo()
  const [draft, setDraft] = useState(() => normalizeProfile(initial || DEFAULT_PROFILE))
  const [draftLocale, setDraftLocale] = useState(locale)
  const t = createTranslator(draftLocale)

  useEffect(() => {
    setDraft(normalizeProfile(initial || DEFAULT_PROFILE))
  }, [initial])

  useEffect(() => {
    setDraftLocale(settings.locale)
  }, [settings.locale])

  const selectedAvatar = getAvatarBaseMeta(draft.avatarBase)

  return (
    <div className="app-shell smooth-ui font-app min-h-[100dvh]">
      <div className="relative mx-auto flex min-h-[100dvh] max-w-5xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute left-[8%] top-[10%] h-44 w-44 rounded-full bg-[#7C3AED]/22 blur-[80px]" />
        <div className="pointer-events-none absolute right-[12%] top-[18%] h-52 w-52 rounded-full bg-[#2563EB]/18 blur-[90px]" />
        <div className="pointer-events-none absolute bottom-[10%] left-[28%] h-40 w-40 rounded-full bg-[#EC4899]/10 blur-[92px]" />

        <section className="relative z-[1] w-full max-w-4xl dashboard-card overflow-hidden border-[#55479A] p-5 sm:p-6 lg:p-7">
          <div className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
            <div className="app-section-card rounded-[28px] p-5">
              <div className="pixel-text text-[10px] uppercase tracking-[0.11em] app-main-text">{t('profileSetup.label')}</div>
              <div className="retro-text mt-2 text-[24px] leading-none app-muted">{t('profileSetup.subtitle')}</div>

              <div className="mt-6 flex justify-center">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <UserAvatar profile={draft} size="xl" className="h-40 w-40 rounded-[24px]" />
                </motion.div>
              </div>

              <div className="app-inline-surface mt-5 rounded-2xl p-4">
                <div className="pixel-text text-[8px] uppercase tracking-[0.1em] app-kicker">{t('profileSetup.currentAvatar')}</div>
                <div className="retro-text mt-1 text-[20px] leading-none app-main-text">{t(`avatars.${selectedAvatar.id}.label`)}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="pixel-text text-[10px] uppercase tracking-[0.11em] app-main-text">{t('profileSetup.title')}</div>
                <h1 className="retro-text mt-2 text-[34px] leading-[0.96] app-main-text">{t('profileSetup.heading')}</h1>
                <p className="retro-text mt-3 text-[20px] leading-[1.15] app-muted">{t('profileSetup.description')}</p>
              </div>

              <div className="app-section-card rounded-2xl p-4">
                <label className="pixel-text text-[8px] uppercase tracking-[0.1em] app-kicker">{t('profileSetup.displayName')}</label>
                <input
                  type="text"
                  value={draft.displayName}
                  onChange={(event) => setDraft((prev) => normalizeProfile({ ...prev, displayName: event.target.value }))}
                  placeholder={t('profileSetup.displayNamePlaceholder')}
                  className="app-input mt-3 w-full rounded-xl px-4 py-3 outline-none"
                />
                <p className="retro-text mt-2 text-[18px] leading-none app-muted">{t('profileSetup.displayNameHelp')}</p>
              </div>

              <div className="app-section-card rounded-2xl p-4">
                <div className="pixel-text text-[8px] uppercase tracking-[0.1em] app-kicker">{t('profileSetup.chooseAvatar')}</div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {PROFILE_AVATAR_BASES.map((option) => (
                    <AvatarBaseCard
                      key={option.id}
                      option={option}
                      selected={draft.avatarBase === option.id}
                      onClick={() => setDraft((prev) => applyAvatarBase(prev, option.id))}
                      label={t(`avatars.${option.id}.label`)}
                      description={t(`avatars.${option.id}.description`)}
                    />
                  ))}
                </div>
              </div>

              <div className="app-section-card rounded-2xl p-4">
                <div className="pixel-text text-[8px] uppercase tracking-[0.1em] app-kicker">{t('profileSetup.languageTitle')}</div>
                <p className="retro-text mt-2 text-[17px] leading-[1.15] app-muted">{t('profileSetup.languageHelp')}</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {LANGUAGE_OPTIONS.map((item) => {
                    const active = draftLocale === item.id
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setDraftLocale(item.id)}
                        className={clsx(
                          'rounded-2xl border px-3 py-3 text-left transition-all',
                          active ? 'shadow-[0_10px_24px_rgba(76,53,184,0.28),inset_0_0_0_1px_rgba(138,111,252,0.24)]' : ''
                        )}
                        style={{
                          borderColor: active ? 'var(--app-primary-btn-border)' : 'var(--app-card-border)',
                          background: active ? 'linear-gradient(180deg, var(--app-accent-soft) 0%, var(--app-panel-deep) 100%)' : 'var(--app-panel-soft)',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[22px] leading-none">{item.icon}</span>
                          <div className="min-w-0">
                            <div className="pixel-text text-[8px] uppercase tracking-[0.1em] app-main-text">{item.shortLabel}</div>
                            <div className="retro-text mt-1 text-[18px] leading-none app-main-text">{item.label}</div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ y: 1 }}
                onClick={() => {
                  setSettings((prev) => ({ ...prev, locale: draftLocale }))
                  onSave?.(normalizeProfile(draft))
                }}
                className="app-primary-btn w-full rounded-xl px-5 py-3 text-white"
              >
                <span className="flex items-center justify-center gap-2">
                  <Sparkles size={16} />
                  <span className="pixel-text text-[8px] uppercase">{t('profileSetup.startJourney')}</span>
                </span>
              </motion.button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
