import React, { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { usePomo } from '../../context/PomoContext'
import UserAvatar from '../../components/Profile/UserAvatar'
import { applyAvatarBase, DEFAULT_PROFILE, normalizeProfile } from '../../data/profileDefaults'
import { getAvatarBaseMeta, PROFILE_AVATAR_BASES } from '../../data/presetAvatars'
import { createTranslator } from '../../data/translations'

function SectionCard({ children, className = '' }) {
  return (
    <section className={`app-section-card rounded-2xl p-4 ${className}`}>
      {children}
    </section>
  )
}

export default function AvatarPickerModal({ isOpen, onClose, profile, onSave }) {
  const { locale } = usePomo()
  const normalizedProfile = useMemo(() => normalizeProfile(profile || DEFAULT_PROFILE), [profile])
  const [draftProfile, setDraftProfile] = useState(normalizedProfile)
  const t = createTranslator(locale)

  useEffect(() => {
    if (!isOpen) return
    setDraftProfile(normalizedProfile)
  }, [isOpen, normalizedProfile])

  const selectedAvatar = getAvatarBaseMeta(draftProfile.avatarBase)

  const handleSave = () => {
    onSave?.(normalizeProfile(draftProfile))
    onClose?.()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[260] flex items-center justify-center p-4"
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
            className="app-modal-shell w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-[30px]"
          >
            <div className="app-modal-header flex items-center justify-between px-5 py-4">
              <div>
                <h2 className="pixel-text text-[12px] uppercase tracking-[0.11em] app-main-text">{t('profile.avatarModalTitle')}</h2>
                <p className="retro-text text-[16px] leading-none app-muted mt-1">{t('profile.avatarModalSubtitle')}</p>
              </div>
              <button
                onClick={onClose}
                className="app-secondary-btn w-10 h-10 rounded-xl flex items-center justify-center"
                aria-label={t('profile.closeAvatarModal')}
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 lg:p-5 overflow-y-auto max-h-[calc(92vh-152px)] custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)] gap-4">
                <SectionCard>
                  <div className="pixel-text text-[8px] uppercase tracking-[0.1em] app-kicker">{t('profile.preview')}</div>
                  <div className="mt-4 flex justify-center">
                    <UserAvatar profile={draftProfile} size="xl" className="h-36 w-36 rounded-[22px]" />
                  </div>
                  <div className="app-inline-surface mt-4 rounded-xl p-3">
                    <div className="pixel-text text-[8px] uppercase app-main-text">{t('profile.selectedAvatar')}</div>
                    <div className="retro-text mt-1 text-[16px] leading-none app-muted">{t(`avatars.${selectedAvatar.id}.label`)}</div>
                  </div>
                  <p className="retro-text mt-3 text-[15px] leading-[1.18] app-muted">
                    {t('profile.avatarPickerHelp')}
                  </p>
                </SectionCard>

                <SectionCard>
                  <div className="pixel-text text-[8px] uppercase tracking-[0.1em] app-kicker">{t('profile.selectBaseAvatar')}</div>
                  <div className="mt-4 grid gap-3">
                    {PROFILE_AVATAR_BASES.map((option) => {
                      const selected = draftProfile.avatarBase === option.id
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setDraftProfile((prev) => applyAvatarBase(prev, option.id))}
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
                            <div className="app-inline-surface h-20 w-20 overflow-hidden rounded-xl">
                              <img src={option.src} alt={t(`avatars.${option.id}.label`)} className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <div className="pixel-text text-[8px] uppercase tracking-[0.1em] app-main-text">{t(`avatars.${option.id}.label`)}</div>
                              <div className="retro-text mt-1 text-[15px] leading-none app-muted">{t(`avatars.${option.id}.description`)}</div>
                            </div>
                          </div>
                          {selected ? (
                            <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border text-white shadow-[0_8px_20px_rgba(76,53,184,0.4)]" style={{ borderColor: 'var(--app-primary-btn-border)', background: 'var(--app-accent)' }}>
                              <Check size={15} />
                            </span>
                          ) : null}
                        </button>
                      )
                    })}
                  </div>
                </SectionCard>
              </div>
            </div>

            <div className="app-footer-bar px-5 py-4 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="app-secondary-btn rounded-xl px-4 py-2 pixel-text text-[8px] uppercase"
              >
                {t('common.cancel')}
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="app-primary-btn rounded-xl px-5 py-2 pixel-text text-[8px] uppercase"
              >
                {t('profile.saveAvatarButton')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
