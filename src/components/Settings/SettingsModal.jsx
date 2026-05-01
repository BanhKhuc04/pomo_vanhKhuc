import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Volume2, Palette, Timer, Bell, Sparkles, User, RotateCcw } from 'lucide-react'
import { usePomo } from '../../context/PomoContext'
import { MODES, DEFAULT_DURATIONS, DEFAULT_SETTINGS } from '../../data/constants'
import { clamp } from '../../utils/helpers'

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

function SectionCard({ icon, title, subtitle, children }) {
  return (
    <section className="rounded-2xl border border-[#4E4386] bg-gradient-to-b from-[#1E1940] to-[#161233] p-4 shadow-[inset_0_0_0_1px_rgba(118,93,210,0.24),0_14px_36px_rgba(3,6,20,0.42)]">
      <div className="mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[#CBBDF5]">{icon}</span>
          <h3 className="pixel-text text-[10px] text-textMain uppercase tracking-[0.11em]">{title}</h3>
        </div>
        {subtitle ? <p className="retro-text text-[18px] leading-none text-textMuted mt-1">{subtitle}</p> : null}
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="retro-text text-[20px] leading-none text-textMain">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-14 rounded-full border transition-colors ${checked ? 'bg-[#5A35CA] border-[#8A6FFC]' : 'bg-[#171433] border-[#4E4386]'}`}
      >
        <span
          className={`absolute top-0.5 h-5.5 w-5.5 rounded-full bg-[#FFF3D7] border border-[#2F2B5A] transition-all ${checked ? 'left-[30px]' : 'left-[3px]'}`}
        />
      </button>
    </div>
  )
}

function SliderRow({ label, value, onChange, suffix = '%' }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="retro-text text-[20px] leading-none text-textMain">{label}</span>
        <span className="pixel-text text-[9px] text-[#F6E6BF]">{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[#14122E] border border-[#4E4386]
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FBBF24] [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-[#2D255A]
                  [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-[#FBBF24] [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-[#2D255A]"
      />
    </div>
  )
}

function DurationStepper({ label, emoji, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="retro-text text-[20px] leading-none text-textMain flex items-center gap-2">
        <span>{emoji}</span>
        {label}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(value - 1)}
          className="w-8 h-8 rounded-lg border border-[#4E4386] bg-[#171433] text-[#D3C8F6] hover:bg-[#231B48]"
        >
          -
        </button>
        <input
          type="number"
          min="1"
          max="120"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-14 text-center rounded-lg border border-[#4E4386] bg-[#120F2A] text-[#FFF2D2] pixel-text text-[9px] py-1.5"
        />
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="w-8 h-8 rounded-lg border border-[#4E4386] bg-[#171433] text-[#D3C8F6] hover:bg-[#231B48]"
        >
          +
        </button>
        <span className="retro-text text-[18px] leading-none text-textMuted w-8">min</span>
      </div>
    </div>
  )
}

export default function SettingsModal({ isOpen, onClose, onEditAvatar }) {
  const { settings, setSettings, resetAllData, muted, setMuted, theme, setTheme } = usePomo()
  const [confirmReset, setConfirmReset] = useState(false)
  const [draftSettings, setDraftSettings] = useState(settings)
  const [draftMuted, setDraftMuted] = useState(muted)
  const [themeChoice, setThemeChoice] = useState(theme || 'dark')
  const [durationPreset, setDurationPreset] = useState(getPresetFromDurations(settings.durations))

  useEffect(() => {
    if (!isOpen) return
    setDraftSettings(settings)
    setDraftMuted(muted)
    setThemeChoice(theme || 'dark')
    setDurationPreset(getPresetFromDurations(settings.durations))
    setConfirmReset(false)
  }, [isOpen, settings, muted, theme])

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
    setSettings(draftSettings)
    setMuted(draftMuted)
    setTheme(themeChoice)
    onClose?.()
  }

  const handleResetDefaults = () => {
    setDraftSettings({
      ...DEFAULT_SETTINGS,
      durations: { ...DEFAULT_DURATIONS }
    })
    setDraftMuted(false)
    setThemeChoice('dark')
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[210] flex items-center justify-center p-4 bg-[#060716]/78"
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
            className="w-full max-w-5xl max-h-[92vh] rounded-[30px] border border-[#5A4D97] overflow-hidden shadow-[0_38px_120px_rgba(3,6,20,0.7),inset_0_0_0_1px_rgba(132,104,228,0.28)]"
            style={{ background: 'linear-gradient(180deg, rgba(28,22,60,0.97) 0%, rgba(18,15,42,0.97) 100%)' }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#4E4386] bg-gradient-to-r from-[#1A153A] to-[#15112E]">
              <div>
                <h2 className="pixel-text text-[12px] text-textMain uppercase tracking-[0.11em]">Settings</h2>
                <p className="retro-text text-[19px] leading-none text-textMuted mt-1">Customize your focus experience</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl border border-[#4E4386] bg-[#171433] text-[#D3C8F6] hover:bg-[#231B48] flex items-center justify-center"
                aria-label="Close settings"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 lg:p-5 overflow-y-auto max-h-[calc(92vh-152px)] custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <SectionCard
                  icon={<Volume2 size={16} />}
                  title="Sound"
                  subtitle="Fine-tune music and effects"
                >
                  <SliderRow
                    label="Music Volume"
                    value={Math.round(draftSettings.musicVolume * 100)}
                    onChange={v => updateField('musicVolume', v / 100)}
                  />
                  <SliderRow
                    label="SFX Volume"
                    value={Math.round(draftSettings.sfxVolume * 100)}
                    onChange={v => updateField('sfxVolume', v / 100)}
                  />
                  <ToggleRow label="Mute all audio" checked={draftMuted} onChange={setDraftMuted} />
                </SectionCard>

                <SectionCard
                  icon={<Palette size={16} />}
                  title="Theme"
                  subtitle="Dark mode is preferred for this app"
                >
                  <div className="rounded-xl border border-[#4E4386] bg-[#120F2A] p-1.5 grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'dark', label: 'Dark', enabled: true },
                      { id: 'light', label: 'Light', enabled: false },
                      { id: 'auto', label: 'Auto', enabled: false },
                    ].map(item => {
                      const active = themeChoice === item.id
                      return (
                        <button
                          key={item.id}
                          type="button"
                          disabled={!item.enabled}
                          onClick={() => item.enabled && setThemeChoice(item.id)}
                          className={`rounded-lg border px-3 py-2 pixel-text text-[8px] uppercase transition-colors
                            ${active ? 'bg-[#5A35CA] border-[#8A6FFC] text-white' : 'bg-[#171433] border-[#4E4386] text-[#BEB4DF]'}
                            ${!item.enabled ? 'opacity-45 cursor-not-allowed' : 'hover:bg-[#231B48]'}`}
                        >
                          {item.label}
                        </button>
                      )
                    })}
                  </div>
                  <ToggleRow
                    label="Auto dark mode (after 6PM)"
                    checked={draftSettings.autoDarkMode}
                    onChange={v => updateField('autoDarkMode', v)}
                  />
                </SectionCard>

                <SectionCard
                  icon={<Timer size={16} />}
                  title="Timer Settings"
                  subtitle="Set your preferred focus cycle"
                >
                  <div>
                    <label className="pixel-text text-[8px] text-[#CFC3F2] uppercase block mb-1.5">Duration Preset</label>
                    <select
                      value={durationPreset}
                      onChange={e => {
                        const id = e.target.value
                        setDurationPreset(id)
                        if (id !== 'custom') applyPreset(id)
                      }}
                      className="w-full rounded-xl border border-[#4E4386] bg-[#120F2A] text-[#E8DCFF] retro-text text-[20px] leading-none px-3 py-2.5 focus:outline-none focus:border-[#8A6FFC]"
                    >
                      {DURATION_PRESETS.map(p => (
                        <option key={p.id} value={p.id}>{p.label}</option>
                      ))}
                      <option value="custom">Custom</option>
                    </select>
                  </div>

                  <DurationStepper
                    label="Focus"
                    emoji="🍅"
                    value={draftSettings.durations[MODES.FOCUS]}
                    onChange={v => updateDuration(MODES.FOCUS, v)}
                  />
                  <DurationStepper
                    label="Short Break"
                    emoji="☕"
                    value={draftSettings.durations[MODES.SHORT_BREAK]}
                    onChange={v => updateDuration(MODES.SHORT_BREAK, v)}
                  />
                  <DurationStepper
                    label="Long Break"
                    emoji="😴"
                    value={draftSettings.durations[MODES.LONG_BREAK]}
                    onChange={v => updateDuration(MODES.LONG_BREAK, v)}
                  />
                </SectionCard>

                <SectionCard
                  icon={<Bell size={16} />}
                  title="Notifications"
                  subtitle="Stay informed without distraction"
                >
                  <ToggleRow
                    label="Browser notifications"
                    checked={draftSettings.notificationsEnabled}
                    onChange={v => updateField('notificationsEnabled', v)}
                  />
                  <ToggleRow
                    label="Tick-tock during focus"
                    checked={draftSettings.tickEnabled}
                    onChange={v => updateField('tickEnabled', v)}
                  />
                </SectionCard>

                <SectionCard
                  icon={<Sparkles size={16} />}
                  title="Appearance"
                  subtitle="Reset and style preferences"
                >
                  <button
                    type="button"
                    onClick={handleResetDefaults}
                    className="w-full rounded-xl border border-[#4E4386] bg-[#171433] hover:bg-[#231B48] px-3 py-2.5 text-left"
                  >
                    <span className="pixel-text text-[8px] text-textMain uppercase">Reset settings to defaults</span>
                    <p className="retro-text text-[18px] leading-none text-textMuted mt-1">Restore timer, audio, and behavior defaults</p>
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className={`w-full rounded-xl border px-3 py-2.5 text-left ${
                      confirmReset
                        ? 'border-[#F87171] bg-[#431B2A]'
                        : 'border-[#6B3B5E] bg-[#2B1733] hover:bg-[#3A1D43]'
                    }`}
                  >
                    <span className="pixel-text text-[8px] text-[#FFD7DE] uppercase">
                      {confirmReset ? 'Click again to confirm reset' : 'Reset all app data'}
                    </span>
                    <p className="retro-text text-[18px] leading-none text-[#D6B7C4] mt-1">Clears tasks, stats, streak, and rewards</p>
                  </button>
                </SectionCard>

                <SectionCard
                  icon={<User size={16} />}
                  title="Avatar"
                  subtitle="Customize your character"
                >
                  <button
                    type="button"
                    onClick={() => {
                      onClose?.()
                      onEditAvatar?.()
                    }}
                    className="w-full rounded-xl border border-[#5A4D97] bg-gradient-to-b from-[#3B2B83] to-[#2D1F65] hover:brightness-110 text-white px-3 py-2.5"
                  >
                    <span className="pixel-text text-[8px] uppercase">Edit Avatar</span>
                    <p className="retro-text text-[18px] leading-none text-[#DCCDFB] mt-1">Open avatar creator</p>
                  </button>
                </SectionCard>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-[#4E4386] bg-[#130F2A] flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleResetDefaults}
                className="rounded-xl border border-[#4E4386] bg-[#171433] hover:bg-[#231B48] px-4 py-2 pixel-text text-[8px] text-[#CFC3F2] uppercase flex items-center gap-2"
              >
                <RotateCcw size={14} />
                Reset Defaults
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-[#4E4386] bg-[#171433] hover:bg-[#231B48] px-4 py-2 pixel-text text-[8px] text-[#CFC3F2] uppercase"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-xl border border-[#8A6FFC] bg-gradient-to-b from-[#6A45E6] to-[#4A2BAF] hover:brightness-110 px-5 py-2 pixel-text text-[8px] text-white uppercase shadow-[0_10px_24px_rgba(76,53,184,0.4)]"
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
