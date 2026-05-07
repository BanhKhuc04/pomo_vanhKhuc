import { useEffect } from 'react'
import { soundManager } from '../utils/soundManager'

export default function useSound({
  masterVolume = 0.35,
  sfxVolume = 1,
  muted = false,
  soundEnabled = true,
} = {}) {
  useEffect(() => {
    soundManager.init()
    return () => {
      soundManager.dispose()
    }
  }, [])

  useEffect(() => {
    soundManager.updateSettings({
      masterVolume,
      sfxVolume,
      muted,
      soundEnabled,
    })
  }, [masterVolume, sfxVolume, muted, soundEnabled])

  return {
    play: soundManager.play.bind(soundManager),
    stop: soundManager.stop.bind(soundManager),
    stopAll: soundManager.stopAll.bind(soundManager),
    isPlaying: soundManager.isPlaying.bind(soundManager),
  }
}
