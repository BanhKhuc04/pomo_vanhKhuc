import { useEffect, useRef, useCallback } from 'react'
import { Howl } from 'howler'
import { SOUNDS, SOUND_CONFIG } from '../data/sounds'

/**
 * useSound - centralized audio management with Howler.js
 * Sound files are optional - missing files won't crash app.
 */
export default function useSound({ musicVolume = 0.4, sfxVolume = 0.6, muted = false } = {}) {
  const soundsRef = useRef({})

  // Init all sounds once
  useEffect(() => {
    Object.entries(SOUNDS).forEach(([key, src]) => {
      const cfg = SOUND_CONFIG[key] || {}
      try {
        soundsRef.current[key] = new Howl({
          src: [src],
          loop: cfg.loop || false,
          volume: cfg.volume || 0.5,
          html5: cfg.isMusic || false,
          preload: true,
          onloaderror: () => {
            // silent: file missing is OK
          },
          onplayerror: () => {
            // try unlock on user interaction
            try {
              soundsRef.current[key]?.once('unlock', () => {
                soundsRef.current[key]?.play()
              })
            } catch (e) {}
          }
        })
      } catch (e) {
        // ignore
      }
    })

    return () => {
      Object.values(soundsRef.current).forEach(s => {
        try { s.stop(); s.unload() } catch (e) {}
      })
      soundsRef.current = {}
    }
  }, [])

  // Update volumes when changed
  useEffect(() => {
    Object.entries(soundsRef.current).forEach(([key, sound]) => {
      const cfg = SOUND_CONFIG[key] || {}
      const baseVol = cfg.volume || 0.5
      const scale = cfg.isMusic ? musicVolume : sfxVolume
      try { sound.volume(muted ? 0 : baseVol * scale * 2) } catch (e) {}
    })
  }, [musicVolume, sfxVolume, muted])

  const play = useCallback((key) => {
    if (muted) return
    const s = soundsRef.current[key]
    if (!s) return
    try {
      if (!s.playing()) s.play()
      else if (!SOUND_CONFIG[key]?.loop) s.play() // allow overlap for sfx
    } catch (e) {}
  }, [muted])

  const stop = useCallback((key) => {
    const s = soundsRef.current[key]
    if (!s) return
    try { s.stop() } catch (e) {}
  }, [])

  const stopAll = useCallback(() => {
    Object.values(soundsRef.current).forEach(s => {
      try { s.stop() } catch (e) {}
    })
  }, [])

  const isPlaying = useCallback((key) => {
    const s = soundsRef.current[key]
    if (!s) return false
    try { return s.playing() } catch (e) { return false }
  }, [])

  return { play, stop, stopAll, isPlaying }
}
