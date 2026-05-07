import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, Languages, Palette, Play, RotateCcw, Square, Timer, Trash2, User, Volume2, X } from 'lucide-react'
import { usePomo } from '../../context/PomoContext'
import { DEFAULT_APP_NAME, DEFAULT_DURATIONS, DEFAULT_SETTINGS, LANGUAGE_OPTIONS, MODES, THEME_MODES } from '../../data/constants'
import { createTranslator, getModeLabel } from '../../data/translations'
import { clamp } from '../../utils/helpers'
import { parseYouTubeMusicUrl } from '../../utils/youtube'
import UserAvatar from '../Profile/UserAvatar'

const DURATION_PRESETS = [
  { id: 'classic', label: 'Classic 25/5/15', durations: { [MODES.FOCUS]: 25, [MODES.SHORT_BREAK]: 5, [MODES.LONG_BREAK]: 15 } },
  { id: 'deep', label: 'Deep Work 50/10/20', durations: { [MODES.FOCUS]: 50, [MODES.SHORT_BREAK]: 10, [MODES.LONG_BREAK]: 20 } },
  { id: 'gentle', label: 'Gentle 15/3/10', durations: { [MODES.FOCUS]: 15, [MODES.SHORT_BREAK]: 3, [MODES.LONG_BREAK]: 10 } },
]

function getPresetFromDurations(durations) {
  const match = DURATION_PRESETS.find(p =>
    p.durations[MODES.FOCUS] === durations[MODES.FOCUS] &&
    p.durations[MODES.SHORT_BREAK] === durations[MODES.SHORT_BREAK] &&
    p.durations[MODES.LONG_BREAK] === durations[MODES.LONG_BREAK]
  )
  return match?.id || 'custom'
}

function SectionCard({ icon, title, subtitle, children, className = '' }) {
  return (
    <section className={`app-section-card rounded-2xl p-4 ${className}`}>
      <div className="mb-3">
        <div className="flex items-center gap-2">
          <span className="app-kicker">{icon}</span>
          <h3 className="pixel-text text-[10px] uppercase tracking-[0.11em] app-main-text">{title}</h3>
        </div>
        {subtitle ? <p className="retro-text text-[15px] leading-none app-muted mt-1">{subtitle}</p> : null}
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="retro-text text-[16px] leading-none app-main-text">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative h-7 w-14 rounded-full border transition-colors"
        style={{
          background: checked ? 'var(--app-accent)' : 'var(--app-panel-deep)',
          borderColor: checked ? 'var(--app-primary-btn-border)' : 'var(--app-card-border)',
        }}
      >
        <span
          className="absolute top-0.5 h-[22px] w-[22px] rounded-full border transition-all"
          style={{
            left: checked ? '30px' : '3px',
            background: checked ? '#fff3d7' : '#ffffff',
            borderColor: 'rgba(47,43,90,0.35)',
          }}
        />
      </button>
    </div>
  )
}

function SliderRow({ label, value, onChange, suffix = '%' }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="retro-text text-[16px] leading-none app-main-text">{label}</span>
        <span className="pixel-text text-[9px]" style={{ color: 'var(--app-warm)' }}>{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer app-inline-surface
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FBBF24] [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-[#2D255A]
          [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-[#FBBF24] [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-[#2D255A]"
      />
    </div>
  )
}

function DurationStepper({ label, emoji, value, onChange, unitLabel = 'min' }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="retro-text text-[16px] leading-none app-main-text flex items-center gap-2">
        <span>{emoji}</span>
        {label}
      </span>
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => onChange(value - 1)} className="app-secondary-btn w-8 h-8 rounded-lg">-</button>
        <input
          type="number"
          min="1"
          max="120"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="app-input w-14 text-center rounded-lg pixel-text text-[9px] py-1.5 focus:outline-none"
        />
        <button type="button" onClick={() => onChange(value + 1)} className="app-secondary-btn w-8 h-8 rounded-lg">+</button>
        <span className="retro-text text-[15px] leading-none app-muted w-8">{unitLabel}</span>
      </div>
    </div>
  )
}

function GoogleIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#FFC107" d="M43.61 20.08H42V20H24v8h11.3C33.65 32.66 29.2 36 24 36c-6.63 0-12-5.37-12-12S17.37 12 24 12c3.06 0 5.84 1.15 7.96 3.04l5.66-5.66C34.09 6.05 29.3 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20c0-1.34-.14-2.65-.39-3.92Z" />
      <path fill="#FF3D00" d="M6.31 14.69l6.57 4.82C14.66 16.01 18.99 12 24 12c3.06 0 5.84 1.15 7.96 3.04l5.66-5.66C34.09 6.05 29.3 4 24 4c-7.68 0-14.36 4.34-17.69 10.69Z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.99 13.45-5.23l-6.19-5.24C29.18 35.1 26.7 36 24 36c-5.18 0-9.62-3.32-11.27-7.94l-6.52 5.02C9.5 39.56 16.2 44 24 44Z" />
      <path fill="#1976D2" d="M43.61 20.08H42V20H24v8h11.3c-.79 2.26-2.24 4.21-4.04 5.53l.01-.01 6.19 5.24C37.02 38.53 44 33 44 24c0-1.34-.14-2.65-.39-3.92Z" />
    </svg>
  )
}

export default function SettingsModal({ isOpen, onClose, onOpenProfile }) {
  const {
    settings, setSettings, resetAllData, profile, playSfx, playHoverSfx, pushToast,
    previewCustomMusic, stopCustomMusic, customMusicRuntime,
  } = usePomo()
  const [confirmReset, setConfirmReset] = useState(false)
  const [draftSettings, setDraftSettings] = useState(settings)
  const [durationPreset, setDurationPreset] = useState(getPresetFromDurations(settings.durations))
  const [accountChoice, setAccountChoice] = useState('guest')
  const t = createTranslator(draftSettings.locale)
  const parsedMusic = parseYouTubeMusicUrl(draftSettings.customMusicUrl)

  useEffect(() => {
    if (!isOpen) return
    setDraftSettings(settings)
    setDurationPreset(getPresetFromDurations(settings.durations))
    setAccountChoice('guest')
    setConfirmReset(false)
  }, [isOpen, settings])

  useEffect(() => {
    if (!isOpen) return
    const prev = document.documentElement.dataset.modal
    document.documentElement.dataset.modal = 'settings'
    document.body.style.overflow = 'hidden'

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', handleEsc)

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
      if (prev === undefined) delete document.documentElement.dataset.modal
      else document.documentElement.dataset.modal = prev
    }
  }, [isOpen, onClose])

  const updateDuration = (mode, value) => {
    const v = clamp(Number(value) || 1, 1, 120)
    setDraftSettings(prev => ({
      ...prev,
      durations: { ...prev.durations, [mode]: v }
    }))
    setDurationPreset('custom')
  }

  const updateField = (field, value) => {
    setDraftSettings(prev => ({ ...prev, [field]: value }))
  }

  const applyPreset = (presetId) => {
    const preset = DURATION_PRESETS.find(p => p.id === presetId)
    if (!preset) return
    setDraftSettings(prev => ({
      ...prev,
      durations: { ...preset.durations }
    }))
    setDurationPreset(presetId)
  }

  const handleSave = () => {
    const resolvedMusicSettings = (() => {
      if (!draftSettings.customMusicUrl.trim()) {
        return {
          customMusicEnabled: false,
          customMusicType: '',
          customMusicUrl: '',
          customVideoId: '',
          customPlaylistId: '',
        }
      }

      if (parsedMusic.isValid) {
        return {
          customMusicEnabled: draftSettings.customMusicEnabled,
          customMusicType: parsedMusic.type,
          customMusicUrl: parsedMusic.canonicalUrl,
          customVideoId: parsedMusic.videoId,
          customPlaylistId: parsedMusic.playlistId,
        }
      }

      return {
        customMusicEnabled: false,
        customMusicType: '',
        customMusicUrl: draftSettings.customMusicUrl,
        customVideoId: '',
        customPlaylistId: '',
      }
    })()

    setSettings({
      ...draftSettings,
      ...resolvedMusicSettings,
    })
    onClose?.()
  }

  const handleSaveCustomMusic = () => {
    if (!draftSettings.customMusicUrl.trim()) {
      const next = {
        ...draftSettings,
        customMusicEnabled: false,
        customMusicType: '',
        customMusicUrl: '',
        customVideoId: '',
        customPlaylistId: '',
      }
      setDraftSettings(next)
      setSettings(prev => ({
        ...prev,
        customMusicEnabled: false,
        customMusicType: '',
        customMusicUrl: '',
        customVideoId: '',
        customPlaylistId: '',
      }))
      stopCustomMusic()
      pushToast({
        type: 'info',
        title: t('settings.customMusicCleared'),
        message: t('settings.customMusicClearedHelp'),
      })
      return
    }

    if (!parsedMusic.isValid) {
      pushToast({
        type: 'warning',
        title: t('settings.customMusicInvalid'),
        message: t('settings.customMusicSubtitle'),
      })
      return
    }

    const next = {
      ...draftSettings,
      customMusicEnabled: true,
      customMusicType: parsedMusic.type,
      customMusicUrl: parsedMusic.canonicalUrl,
      customVideoId: parsedMusic.videoId,
      customPlaylistId: parsedMusic.playlistId,
    }
    setDraftSettings(next)
    setSettings(prev => ({
      ...prev,
      customMusicEnabled: true,
      customMusicType: parsedMusic.type,
      customMusicUrl: parsedMusic.canonicalUrl,
      customVideoId: parsedMusic.videoId,
      customPlaylistId: parsedMusic.playlistId,
    }))
    pushToast({
      type: 'success',
      title: t('settings.customMusicSaved'),
      message: t('settings.customMusicSavedHelp'),
    })
  }

  const handleClearCustomMusic = () => {
    const next = {
      ...draftSettings,
      customMusicEnabled: false,
      customMusicType: '',
      customMusicUrl: '',
      customVideoId: '',
      customPlaylistId: '',
    }
    setDraftSettings(next)
    setSettings(prev => ({
      ...prev,
      customMusicEnabled: false,
      customMusicType: '',
      customMusicUrl: '',
      customVideoId: '',
      customPlaylistId: '',
    }))
    stopCustomMusic()
    pushToast({
      type: 'info',
      title: t('settings.customMusicCleared'),
      message: t('settings.customMusicClearedHelp'),
    })
  }

  const handleResetDefaults = () => {
    setDraftSettings({
      ...DEFAULT_SETTINGS,
      appName: DEFAULT_APP_NAME,
      durations: { ...DEFAULT_DURATIONS }
    })
    setDurationPreset('classic')
  }

  const handleReset = () => {
    if (confirmReset) {
      resetAllData()
      setConfirmReset(false)
      onClose?.()
    } else {
      setConfirmReset(true)
      setTimeout(() => setConfirmReset(false), 4000)
    }
  }

  const handleGoogleIntent = () => {
    playSfx('CLICK')
    setAccountChoice('google')
    pushToast({
      type: 'info',
      title: t('toasts.syncComingSoonTitle'),
      message: t('toasts.syncComingSoonMessage'),
    })
  }

  const handleStayGuest = () => {
    playSfx('CLICK')
    setAccountChoice('guest')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[210] flex items-center justify-center p-4"
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
            onClick={e => e.stopPropagation()}
            className="app-modal-shell w-full max-w-5xl max-h-[92vh] rounded-[30px] overflow-hidden"
          >
            <div className="app-modal-header flex items-center justify-between px-5 py-4">
              <div>
                <h2 className="pixel-text text-[12px] uppercase tracking-[0.11em] app-main-text">{t('settings.title')}</h2>
                <p className="retro-text text-[16px] leading-none app-muted mt-1">{t('settings.subtitle')}</p>
              </div>
              <button
                onClick={onClose}
                className="app-secondary-btn w-10 h-10 rounded-xl flex items-center justify-center"
                aria-label={t('common.close')}
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 lg:p-5 overflow-y-auto max-h-[calc(92vh-152px)] custom-scrollbar">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <SectionCard
                  icon={<Volume2 size={16} />}
                  title={t('settings.soundTitle')}
                  subtitle={t('settings.soundSubtitle')}
                >
                  <SliderRow
                    label={t('settings.masterVolume')}
                    value={Math.round(draftSettings.masterVolume * 100)}
                    onChange={v => updateField('masterVolume', v / 100)}
                  />
                  <SliderRow
                    label={t('settings.sfxVolume')}
                    value={Math.round(draftSettings.sfxVolume * 100)}
                    onChange={v => updateField('sfxVolume', v / 100)}
                  />
                  <ToggleRow label={t('settings.soundEnabled')} checked={draftSettings.soundEnabled} onChange={v => updateField('soundEnabled', v)} />
                  <ToggleRow label={t('settings.muteAll')} checked={draftSettings.muted} onChange={v => updateField('muted', v)} />

                  <div className="rounded-2xl border p-3" style={{ borderColor: 'var(--app-card-border)', background: 'linear-gradient(180deg, rgba(39,29,88,0.3) 0%, rgba(23,18,56,0.62) 100%)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}>
                    <div className="mb-3">
                      <div className="pixel-text text-[8px] uppercase tracking-[0.1em] app-main-text">{t('settings.customMusicTitle')}</div>
                      <p className="retro-text text-[15px] leading-[1.18] app-muted mt-1">{t('settings.customMusicSubtitle')}</p>
                    </div>

                    <ToggleRow
                      label={t('settings.customMusicEnabled')}
                      checked={draftSettings.customMusicEnabled}
                      onChange={(value) => updateField('customMusicEnabled', value)}
                    />

                    <input
                      type="text"
                      value={draftSettings.customMusicUrl}
                      onChange={(event) => updateField('customMusicUrl', event.target.value)}
                      placeholder={t('settings.customMusicPlaceholder')}
                      className="app-input w-full rounded-xl px-4 py-3 outline-none"
                    />

                    <div className="mt-2.5 rounded-xl border px-3 py-2.5" style={{ borderColor: parsedMusic.isValid ? 'rgba(126,247,123,0.28)' : 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                      <div className="pixel-text text-[8px] uppercase app-kicker">
                        {customMusicRuntime.title || (parsedMusic.type === 'playlist' ? t('settings.customMusicPlaylistLabel') : 'YouTube Video')}
                      </div>
                      <p className="retro-text mt-1 text-[14px] leading-[1.22] app-muted">
                        {draftSettings.customMusicUrl.trim()
                          ? parsedMusic.isValid ? t('settings.customMusicValid') : t('settings.customMusicInvalid')
                          : t('settings.customMusicSubtitle')}
                      </p>
                      {customMusicRuntime.needsInteraction ? (
                        <p className="retro-text mt-1 text-[14px] leading-none" style={{ color: 'var(--app-warm)' }}>
                          {t('settings.customMusicNeedsInteraction')}
                        </p>
                      ) : null}
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      <button type="button" onMouseEnter={playHoverSfx} onClick={handleSaveCustomMusic} className="app-primary-btn rounded-xl px-3 py-2.5">
                        <span className="pixel-text text-[8px] uppercase">{t('settings.customMusicSave')}</span>
                      </button>
                      <button type="button" onMouseEnter={playHoverSfx} onClick={handleClearCustomMusic} className="app-secondary-btn rounded-xl px-3 py-2.5 flex items-center justify-center gap-2">
                        <Trash2 size={14} />
                        <span className="pixel-text text-[8px] uppercase">{t('settings.customMusicClear')}</span>
                      </button>
                      <button
                        type="button"
                        onMouseEnter={playHoverSfx}
                        onClick={() => {
                          if (parsedMusic.isValid) {
                            const next = {
                              ...draftSettings,
                              customMusicEnabled: true,
                              customMusicType: parsedMusic.type,
                              customMusicUrl: parsedMusic.canonicalUrl,
                              customVideoId: parsedMusic.videoId,
                              customPlaylistId: parsedMusic.playlistId,
                            }
                            setDraftSettings(next)
                            setSettings(prev => ({
                              ...prev,
                              customMusicEnabled: true,
                              customMusicType: parsedMusic.type,
                              customMusicUrl: parsedMusic.canonicalUrl,
                              customVideoId: parsedMusic.videoId,
                              customPlaylistId: parsedMusic.playlistId,
                            }))
                            previewCustomMusic()
                            return
                          }
                          if (draftSettings.customVideoId || draftSettings.customPlaylistId) {
                            previewCustomMusic()
                          }
                        }}
                        className="app-secondary-btn rounded-xl px-3 py-2.5 flex items-center justify-center gap-2"
                      >
                        <Play size={14} />
                        <span className="pixel-text text-[8px] uppercase">{t('settings.customMusicPreview')}</span>
                      </button>
                      <button type="button" onMouseEnter={playHoverSfx} onClick={stopCustomMusic} className="app-secondary-btn rounded-xl px-3 py-2.5 flex items-center justify-center gap-2">
                        <Square size={13} />
                        <span className="pixel-text text-[8px] uppercase">{t('settings.customMusicStop')}</span>
                      </button>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard
                  icon={<Palette size={16} />}
                  title={t('settings.themeTitle')}
                  subtitle={t('settings.themeSubtitle')}
                >
                  <div className="app-inline-surface rounded-xl p-1.5 grid grid-cols-3 gap-1.5">
                    {[
                      { id: THEME_MODES.DARK, label: t('settings.themeOptions.dark') },
                      { id: THEME_MODES.LIGHT, label: t('settings.themeOptions.light') },
                      { id: THEME_MODES.AUTO, label: t('settings.themeOptions.auto') },
                    ].map(item => {
                      const active = draftSettings.themeMode === item.id
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => updateField('themeMode', item.id)}
                          className={`rounded-lg border px-3 py-2 pixel-text text-[8px] uppercase transition-colors ${
                            active ? 'app-primary-btn' : 'app-secondary-btn'
                          }`}
                        >
                          {item.label}
                        </button>
                      )
                    })}
                  </div>
                  <p className="retro-text text-[15px] leading-none app-muted">{t('settings.themeAutoHelp')}</p>
                </SectionCard>

                <SectionCard
                  icon={<Languages size={16} />}
                  title={t('settings.languageTitle')}
                  subtitle={t('settings.languageSubtitle')}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {LANGUAGE_OPTIONS.map((item) => {
                      const active = draftSettings.locale === item.id
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => updateField('locale', item.id)}
                          className={`rounded-xl border px-3 py-3 text-left transition-all ${active ? 'app-primary-btn' : 'app-secondary-btn'}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-[22px] leading-none">{item.icon}</span>
                            <div className="min-w-0">
                              <div className="pixel-text text-[8px] uppercase app-main-text">{item.shortLabel}</div>
                              <div className="retro-text text-[16px] leading-none mt-1 app-main-text">{item.label}</div>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                  <p className="retro-text text-[15px] leading-[1.18] app-muted">{t('settings.languageHelp')}</p>
                </SectionCard>

                <SectionCard
                  icon={<User size={16} />}
                  title={t('settings.accountTitle')}
                  subtitle={t('settings.accountSubtitle')}
                >
                  <div className="app-inline-surface rounded-xl p-3 flex items-center gap-3">
                    <UserAvatar profile={profile} size="sm" className="h-12 w-12 rounded-[14px]" />
                    <div className="min-w-0">
                      <div className="retro-text text-[17px] leading-none app-main-text">{profile?.displayName || 'Coder'}</div>
                      <div className="pixel-text text-[8px] uppercase app-kicker mt-1">
                        {accountChoice === 'google' ? t('settings.googleInterest') : t('settings.guestModeLabel')}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl border px-3 py-2.5" style={{ borderColor: 'var(--app-card-border)', background: 'color-mix(in srgb, var(--app-panel-deep) 88%, transparent 12%)' }}>
                    <span className="pixel-text text-[8px] uppercase" style={{ color: 'var(--app-text-soft)' }}>{t('settings.guestModeLabel')}</span>
                    <p className="retro-text text-[15px] leading-[1.18] app-muted mt-1">
                      {t('settings.guestModeHelp')}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onMouseEnter={playHoverSfx}
                      onClick={handleGoogleIntent}
                      className="app-primary-btn rounded-xl px-3 py-2.5 text-left"
                    >
                      <span className="flex items-center gap-2">
                        <GoogleIcon />
                        <span className="pixel-text text-[8px] uppercase">{t('settings.continueWithGoogle')}</span>
                      </span>
                      <p className="retro-text text-[15px] leading-none text-[#DCCDFB] mt-1">{t('settings.googlePreview')}</p>
                    </button>
                    <button
                      type="button"
                      onMouseEnter={playHoverSfx}
                      onClick={handleStayGuest}
                      className="app-secondary-btn rounded-xl px-3 py-2.5 text-left"
                    >
                      <span className="pixel-text text-[8px] uppercase">{t('settings.stayGuest')}</span>
                      <p className="retro-text text-[15px] leading-none app-muted mt-1">{t('settings.stayGuestHelp')}</p>
                    </button>
                  </div>
                  <div className="rounded-xl border px-3 py-2.5" style={{ borderColor: 'var(--app-card-border)', background: 'color-mix(in srgb, var(--app-panel-deep) 72%, transparent 28%)' }}>
                    <span className="pixel-text text-[8px] uppercase" style={{ color: 'var(--app-text-soft)' }}>{t('settings.syncStatus')}</span>
                    <p className="retro-text text-[15px] leading-[1.18] app-muted mt-1">{t('settings.syncStatusHelp')}</p>
                  </div>
                </SectionCard>

                <SectionCard
                  icon={<Timer size={16} />}
                  title={t('settings.timerTitle')}
                  subtitle={t('settings.timerSubtitle')}
                >
                  <div>
                    <label className="pixel-text text-[8px] uppercase app-kicker block mb-1.5">{t('settings.durationPreset')}</label>
                    <select
                      value={durationPreset}
                      onChange={e => {
                        const id = e.target.value
                        setDurationPreset(id)
                        if (id !== 'custom') applyPreset(id)
                      }}
                      className="app-input w-full rounded-xl retro-text text-[16px] leading-none px-3 py-2.5 focus:outline-none"
                    >
                      {DURATION_PRESETS.map(p => (
                        <option key={p.id} value={p.id}>{t(`settings.durationPresets.${p.id}`)}</option>
                      ))}
                      <option value="custom">{t('settings.durationPresets.custom')}</option>
                    </select>
                  </div>

                  <DurationStepper label={getModeLabel(draftSettings.locale, MODES.FOCUS)} emoji="🍅" value={draftSettings.durations[MODES.FOCUS]} onChange={v => updateDuration(MODES.FOCUS, v)} unitLabel={t('common.minuteUnit')} />
                  <DurationStepper label={getModeLabel(draftSettings.locale, MODES.SHORT_BREAK)} emoji="☕" value={draftSettings.durations[MODES.SHORT_BREAK]} onChange={v => updateDuration(MODES.SHORT_BREAK, v)} unitLabel={t('common.minuteUnit')} />
                  <DurationStepper label={getModeLabel(draftSettings.locale, MODES.LONG_BREAK)} emoji="😴" value={draftSettings.durations[MODES.LONG_BREAK]} onChange={v => updateDuration(MODES.LONG_BREAK, v)} unitLabel={t('common.minuteUnit')} />
                  <ToggleRow label={t('settings.autoCycleTitle')} checked={draftSettings.autoCycleEnabled} onChange={v => updateField('autoCycleEnabled', v)} />
                </SectionCard>

                <SectionCard
                  icon={<Bell size={16} />}
                  title={t('settings.notificationsTitle')}
                  subtitle={t('settings.notificationsSubtitle')}
                >
                  <ToggleRow label={t('settings.browserNotifications')} checked={draftSettings.notificationsEnabled} onChange={v => updateField('notificationsEnabled', v)} />
                  <ToggleRow label={t('settings.tickTock')} checked={draftSettings.tickEnabled} onChange={v => updateField('tickEnabled', v)} />
                </SectionCard>

                <SectionCard
                  icon={<User size={16} />}
                  title={t('settings.profileTitle')}
                  subtitle={t('settings.profileSubtitle')}
                >
                  <button
                    type="button"
                    onMouseEnter={playHoverSfx}
                    onClick={() => {
                      onClose?.()
                      onOpenProfile?.()
                    }}
                    className="app-primary-btn w-full rounded-xl px-3 py-2.5 text-left"
                  >
                    <span className="pixel-text text-[8px] uppercase">{t('settings.openProfile')}</span>
                    <p className="retro-text text-[15px] leading-none text-[#DCCDFB] mt-1">{t('settings.openProfileHelp')}</p>
                  </button>
                </SectionCard>

                <SectionCard
                  icon={<RotateCcw size={16} />}
                  title={t('settings.appearanceTitle')}
                  subtitle={t('settings.appearanceSubtitle')}
                >
                  <button
                    type="button"
                    onMouseEnter={playHoverSfx}
                    onClick={handleResetDefaults}
                    className="app-secondary-btn w-full rounded-xl px-3 py-2.5 text-left"
                  >
                    <span className="pixel-text text-[8px] uppercase">{t('settings.resetDefaults')}</span>
                    <p className="retro-text text-[15px] leading-none app-muted mt-1">{t('settings.resetDefaultsHelp')}</p>
                  </button>

                  <button
                    type="button"
                    onMouseEnter={playHoverSfx}
                    onClick={handleReset}
                    className="w-full rounded-xl border px-3 py-2.5 text-left"
                    style={{
                      borderColor: confirmReset ? 'var(--app-danger)' : 'var(--app-card-border)',
                      background: confirmReset ? 'rgba(127,29,29,0.18)' : 'var(--app-panel-deep)',
                    }}
                  >
                    <span className="pixel-text text-[8px] uppercase" style={{ color: confirmReset ? '#ffd7de' : 'var(--app-text-main)' }}>
                      {confirmReset ? t('settings.resetAllDataConfirm') : t('settings.resetAllData')}
                    </span>
                    <p className="retro-text text-[15px] leading-none app-muted mt-1">{t('settings.resetAllDataHelp')}</p>
                  </button>
                </SectionCard>
              </div>
            </div>

            <div className="app-footer-bar px-5 py-4 flex flex-wrap items-center justify-end gap-3">
              <button type="button" onMouseEnter={playHoverSfx} onClick={handleResetDefaults} className="app-secondary-btn rounded-xl px-4 py-2 pixel-text text-[8px] uppercase flex items-center gap-2">
                <RotateCcw size={14} />
                {t('settings.footerResetDefaults')}
              </button>
              <button type="button" onMouseEnter={playHoverSfx} onClick={onClose} className="app-secondary-btn rounded-xl px-4 py-2 pixel-text text-[8px] uppercase">
                {t('common.cancel')}
              </button>
              <button type="button" onMouseEnter={playHoverSfx} onClick={handleSave} className="app-primary-btn rounded-xl px-5 py-2 pixel-text text-[8px] uppercase">
                {t('common.save')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
