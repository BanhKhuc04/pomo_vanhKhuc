// Sound asset paths. Place corresponding mp3 files in public/sounds/
// You can download free sounds from pixabay.com, freesound.org, or zapsplat.com
export const SOUNDS = {
  LOFI_BG: '/sounds/lofi-bg.mp3',
  TICK: '/sounds/tick.mp3',
  BELL: '/sounds/bell.mp3',
  CLICK: '/sounds/click.mp3',
  ACHIEVEMENT: '/sounds/achievement.mp3',
  MEOW: '/sounds/meow.mp3'
}

export const SOUND_CONFIG = {
  LOFI_BG: { loop: true, volume: 0.4, isMusic: true },
  TICK: { loop: false, volume: 0.3, isMusic: false },
  BELL: { loop: false, volume: 0.7, isMusic: false },
  CLICK: { loop: false, volume: 0.5, isMusic: false },
  ACHIEVEMENT: { loop: false, volume: 0.7, isMusic: false },
  MEOW: { loop: false, volume: 0.6, isMusic: false }
}
