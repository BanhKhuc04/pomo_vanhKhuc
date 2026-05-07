import { Howl, Howler } from 'howler'
import { SOUNDS, SOUND_CONFIG } from '../data/sounds'

class SoundManager {
  constructor() {
    this.sounds = new Map()
    this.lastPlayedAt = new Map()
    this.settings = {
      masterVolume: 0.35,
      sfxVolume: 1,
      muted: false,
      soundEnabled: true,
    }
    this.initialized = false
    this.cleanupUnlock = null
  }

  init() {
    if (this.initialized || typeof window === 'undefined') return
    this.initialized = true
    Howler.autoUnlock = true

    Object.entries(SOUNDS).forEach(([key, src]) => {
      const cfg = SOUND_CONFIG[key] || {}
      try {
        const sound = new Howl({
          src: [src],
          preload: true,
          html5: false,
          loop: false,
          volume: this.resolveVolume(key),
          onplayerror: () => {
            try {
              Howler.ctx?.resume?.()
            } catch (error) {}
          },
          onloaderror: () => {},
        })
        this.sounds.set(key, sound)
      } catch (error) {}
    })

    const unlockAudio = () => {
      try {
        Howler.ctx?.resume?.()
      } catch (error) {}
    }

    window.addEventListener('pointerdown', unlockAudio, { passive: true })
    window.addEventListener('keydown', unlockAudio)
    this.cleanupUnlock = () => {
      window.removeEventListener('pointerdown', unlockAudio)
      window.removeEventListener('keydown', unlockAudio)
    }
  }

  dispose() {
    if (this.cleanupUnlock) this.cleanupUnlock()
    this.cleanupUnlock = null
    this.sounds.forEach((sound) => {
      try {
        sound.stop()
        sound.unload()
      } catch (error) {}
    })
    this.sounds.clear()
    this.lastPlayedAt.clear()
    this.initialized = false
  }

  updateSettings(nextSettings = {}) {
    this.settings = {
      ...this.settings,
      ...nextSettings,
    }

    this.sounds.forEach((sound, key) => {
      try {
        sound.volume(this.resolveVolume(key))
      } catch (error) {}
    })
  }

  resolveVolume(key) {
    const cfg = SOUND_CONFIG[key] || {}
    const baseVolume = typeof cfg.volume === 'number' ? cfg.volume : 0.2
    const volume = baseVolume * this.settings.masterVolume * this.settings.sfxVolume
    if (!this.settings.soundEnabled || this.settings.muted) return 0
    return Math.max(0, Math.min(1, volume))
  }

  play(key) {
    if (!this.settings.soundEnabled || this.settings.muted) return
    const sound = this.sounds.get(key)
    if (!sound) return

    const cfg = SOUND_CONFIG[key] || {}
    const now = Date.now()
    const throttleMs = cfg.throttleMs || 0
    const lastPlayed = this.lastPlayedAt.get(key) || 0
    if (throttleMs > 0 && now - lastPlayed < throttleMs) return
    this.lastPlayedAt.set(key, now)

    try {
      if (cfg.interrupt && sound.playing()) sound.stop()
      sound.volume(this.resolveVolume(key))
      sound.play()
    } catch (error) {}
  }

  stop(key) {
    const sound = this.sounds.get(key)
    if (!sound) return
    try {
      sound.stop()
    } catch (error) {}
  }

  stopAll() {
    this.sounds.forEach((sound) => {
      try {
        sound.stop()
      } catch (error) {}
    })
  }

  isPlaying(key) {
    const sound = this.sounds.get(key)
    if (!sound) return false
    try {
      return sound.playing()
    } catch (error) {
      return false
    }
  }
}

export const soundManager = new SoundManager()
