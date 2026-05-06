import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Pencil, UserRound, X } from 'lucide-react'
import { usePomo } from '../../context/PomoContext'
import UserAvatar from '../../components/Profile/UserAvatar'
import AvatarPickerModal from './AvatarPickerModal'
import { normalizeProfile } from '../../data/profileDefaults'
import { getAvatarBaseMeta } from '../../data/presetAvatars'
import { createTranslator } from '../../data/translations'

function SectionCard({ children, className = '' }) {
  return (
    <section className={`app-section-card rounded-2xl p-4 ${className}`}>
      {children}
    </section>
  )
}

function StatCard({ label, value }) {
  return (
    <SectionCard className="p-4">
      <div className="pixel-text text-[8px] uppercase tracking-[0.1em] app-kicker">{label}</div>
      <div className="retro-text mt-2 text-[22px] leading-none app-main-text">{value}</div>
    </SectionCard>
  )
}

export default function ProfileModal({ isOpen, onClose }) {
  const { profile, saveProfile, stats, streak, playSfx, locale } = usePomo()
  const [draftProfile, setDraftProfile] = useState(profile ? normalizeProfile(profile) : null)
  const [isEditingName, setIsEditingName] = useState(false)
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false)

  useEffect(() => {
    if (!isOpen || !profile) return
    setDraftProfile(normalizeProfile(profile))
    setIsEditingName(false)
  }, [isOpen, profile])

  useEffect(() => {
    if (!isOpen) return
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!profile || !draftProfile) return null

  const selectedAvatar = getAvatarBaseMeta(draftProfile.avatarBase)
  const t = createTranslator(locale)

  const handleSave = () => {
    saveProfile(normalizeProfile(draftProfile))
    onClose?.()
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[240] flex items-center justify-center p-4"
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
              className="app-modal-shell w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-[30px]"
            >
              <div className="app-modal-header flex items-center justify-between px-5 py-4">
                <div>
                  <h2 className="pixel-text text-[12px] uppercase tracking-[0.11em] app-main-text">{t('profile.title')}</h2>
                  <p className="retro-text text-[16px] leading-none app-muted mt-1">{t('profile.subtitle')}</p>
                </div>
                <button
                  onClick={onClose}
                  className="app-secondary-btn w-10 h-10 rounded-xl flex items-center justify-center"
                  aria-label={t('profile.closeProfile')}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-4 lg:p-5 overflow-y-auto max-h-[calc(92vh-152px)] custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <SectionCard>
                    <div className="pixel-text text-[8px] uppercase tracking-[0.1em] app-kicker">{t('profile.avatar')}</div>
                    <div className="mt-4 flex justify-center">
                      <UserAvatar profile={draftProfile} size="xl" className="h-36 w-36 rounded-[22px]" />
                    </div>
                    <div className="app-inline-surface mt-4 rounded-xl p-3">
                      <div className="pixel-text text-[8px] uppercase app-main-text">{t('profile.currentAvatar')}</div>
                      <div className="retro-text mt-1 text-[16px] leading-none app-muted">{t(`avatars.${selectedAvatar.id}.label`)}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        playSfx('CLICK')
                        setAvatarPickerOpen(true)
                      }}
                      className="app-primary-btn mt-4 w-full rounded-xl px-3 py-2.5"
                    >
                      <span className="pixel-text text-[8px] uppercase">{t('profile.changeAvatar')}</span>
                      <p className="retro-text text-[15px] leading-none text-[#DCCDFB] mt-1">{t('profile.changeAvatarHelp')}</p>
                    </button>
                  </SectionCard>

                  <SectionCard>
                    <div className="pixel-text text-[8px] uppercase tracking-[0.1em] app-kicker">{t('profile.profileInfo')}</div>
                    {isEditingName ? (
                      <div className="mt-4">
                        <input
                          type="text"
                          value={draftProfile.displayName}
                          onChange={(event) => setDraftProfile((prev) => normalizeProfile({ ...prev, displayName: event.target.value }))}
                          placeholder={t('profile.displayNamePlaceholder')}
                          className="app-input w-full rounded-xl px-4 py-3 focus:outline-none"
                        />
                        <p className="retro-text mt-2 text-[15px] leading-none app-muted">{t('profile.displayNameHelp')}</p>
                      </div>
                    ) : (
                      <div className="app-inline-surface mt-4 rounded-xl p-4">
                        <div className="pixel-text text-[8px] uppercase app-main-text">{t('profile.displayName')}</div>
                        <div className="retro-text mt-2 text-[24px] leading-none app-main-text">{draftProfile.displayName}</div>
                        <p className="retro-text mt-2 text-[15px] leading-none app-muted">{t('profile.displayNameShort')}</p>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        playSfx('CLICK')
                        setIsEditingName((prev) => !prev)
                      }}
                      className="app-secondary-btn mt-4 w-full rounded-xl px-3 py-2.5 text-left"
                    >
                      <span className="flex items-center gap-2">
                        <Pencil size={14} className="app-kicker" />
                        <span className="pixel-text text-[8px] app-main-text uppercase">{isEditingName ? t('profile.doneEditing') : t('profile.editProfile')}</span>
                      </span>
                      <p className="retro-text text-[15px] leading-none app-muted mt-1">
                        {isEditingName ? t('profile.reviewDisplayName') : t('profile.updateDisplayName')}
                      </p>
                    </button>

                    <div className="app-inline-surface mt-4 rounded-xl p-3">
                      <div className="flex items-center gap-2 app-kicker">
                        <UserRound size={15} />
                        <span className="pixel-text text-[8px] uppercase app-main-text">{t('profile.helper')}</span>
                      </div>
                      <p className="retro-text mt-2 text-[15px] leading-[1.18] app-muted">
                        {t('profile.helperText')}
                      </p>
                    </div>
                  </SectionCard>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <StatCard label={t('profile.todayPomos')} value={stats.todayPomos} />
                  <StatCard label={t('profile.streak')} value={streak.count} />
                  <StatCard label={t('profile.totalPomos')} value={stats.totalPomos} />
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
                  {t('common.save')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AvatarPickerModal
        isOpen={avatarPickerOpen}
        onClose={() => setAvatarPickerOpen(false)}
        profile={draftProfile}
        onSave={(nextProfile) => setDraftProfile(normalizeProfile(nextProfile))}
      />
    </>
  )
}
