import React, { useState } from 'react'
import PixelModal from '../UI/PixelModal'
import PixelButton from '../UI/PixelButton'
import PixelSlider from '../UI/PixelSlider'
import PixelToggle from '../UI/PixelToggle'
import { usePomo } from '../../context/PomoContext'
import { MODES, DEFAULT_DURATIONS } from '../../data/constants'
import { clamp } from '../../utils/helpers'

export default function SettingsModal({ isOpen, onClose }) {
  const { settings, setSettings, resetAllData, muted, setMuted } = usePomo()
  const [confirmReset, setConfirmReset] = useState(false)

  const updateDuration = (mode, value) => {
    const v = clamp(Number(value) || 1, 1, 120)
    setSettings(prev => ({
      ...prev,
      durations: { ...prev.durations, [mode]: v }
    }))
  }

  const updateField = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleReset = () => {
    if (confirmReset) {
      resetAllData()
      setConfirmReset(false)
      onClose()
    } else {
      setConfirmReset(true)
      setTimeout(() => setConfirmReset(false), 4000)
    }
  }

  const DurationInput = ({ label, mode, emoji }) => (
    <div className="flex items-center justify-between gap-3">
      <span className="retro-text text-base sm:text-lg flex items-center gap-2 text-ink dark:text-cream">
        <span>{emoji}</span>{label}
      </span>
      <div className="flex items-center gap-2">
        <PixelButton
          variant="ghost"
          size="sm"
          onClick={() => updateDuration(mode, settings.durations[mode] - 1)}
          className="!min-h-[36px] !w-9 !p-0"
        >−</PixelButton>
        <input
          type="number"
          min="1"
          max="120"
          value={settings.durations[mode]}
          onChange={e => updateDuration(mode, e.target.value)}
          className="w-14 text-center pixel-border no-rounded bg-cream dark:bg-night text-ink dark:text-cream pixel-text text-xs py-1.5"
        />
        <PixelButton
          variant="ghost"
          size="sm"
          onClick={() => updateDuration(mode, settings.durations[mode] + 1)}
          className="!min-h-[36px] !w-9 !p-0"
        >+</PixelButton>
        <span className="retro-text text-base text-ink/70 dark:text-cream/70 w-8">min</span>
      </div>
    </div>
  )

  return (
    <PixelModal isOpen={isOpen} onClose={onClose} title="⚙️ Settings">
      <div className="space-y-5">
        {/* Durations */}
        <section>
          <h3 className="pixel-text text-[10px] sm:text-xs mb-3 text-orangeDark dark:text-star uppercase">
            ⏰ Timer Durations
          </h3>
          <div className="space-y-2">
            <DurationInput label="Focus" mode={MODES.FOCUS} emoji="🍅" />
            <DurationInput label="Short Break" mode={MODES.SHORT_BREAK} emoji="☕" />
            <DurationInput label="Long Break" mode={MODES.LONG_BREAK} emoji="😴" />
          </div>
        </section>

        {/* Audio */}
        <section className="pt-3 border-t-2 border-ink/20 dark:border-cream/20">
          <h3 className="pixel-text text-[10px] sm:text-xs mb-3 text-orangeDark dark:text-star uppercase">
            🔊 Audio
          </h3>
          <div className="space-y-3">
            <PixelSlider
              label="Music Volume"
              value={Math.round(settings.musicVolume * 100)}
              onChange={v => updateField('musicVolume', v / 100)}
              suffix="%"
            />
            <PixelSlider
              label="SFX Volume"
              value={Math.round(settings.sfxVolume * 100)}
              onChange={v => updateField('sfxVolume', v / 100)}
              suffix="%"
            />
            <PixelToggle
              label="🔕 Mute All"
              checked={muted}
              onChange={setMuted}
            />
            <PixelToggle
              label="🕐 Tick-Tock During Focus"
              checked={settings.tickEnabled}
              onChange={v => updateField('tickEnabled', v)}
            />
          </div>
        </section>

        {/* Behavior */}
        <section className="pt-3 border-t-2 border-ink/20 dark:border-cream/20">
          <h3 className="pixel-text text-[10px] sm:text-xs mb-3 text-orangeDark dark:text-star uppercase">
            🎮 Behavior
          </h3>
          <div className="space-y-3">
            <PixelToggle
              label="🌙 Auto Dark Mode (after 6PM)"
              checked={settings.autoDarkMode}
              onChange={v => updateField('autoDarkMode', v)}
            />
            <PixelToggle
              label="🔔 Browser Notifications"
              checked={settings.notificationsEnabled}
              onChange={v => updateField('notificationsEnabled', v)}
            />
          </div>
        </section>

        {/* Danger zone */}
        <section className="pt-3 border-t-2 border-ink/20 dark:border-cream/20">
          <h3 className="pixel-text text-[10px] sm:text-xs mb-3 text-rose-700 dark:text-rose-400 uppercase">
            ⚠️ Danger Zone
          </h3>
          <div className="flex flex-wrap gap-3 items-center">
            <PixelButton
              variant="danger"
              size="md"
              onClick={handleReset}
            >
              {confirmReset ? '⚠️ Click again to confirm' : '🗑️ Reset All Data'}
            </PixelButton>
            <PixelButton
              variant="ghost"
              size="md"
              onClick={() => setSettings(prev => ({ ...prev, durations: { ...DEFAULT_DURATIONS } }))}
            >
              ↺ Reset Durations
            </PixelButton>
          </div>
        </section>

        <div className="text-center pt-2">
          <PixelButton variant="primary" size="md" onClick={onClose}>
            ✓ Done
          </PixelButton>
        </div>
      </div>
    </PixelModal>
  )
}
