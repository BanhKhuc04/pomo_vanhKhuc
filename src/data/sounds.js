export const SOUNDS = {
  CLICK: '/sounds/click.mp3',
  HOVER: '/sounds/hover.mp3',
  START: '/sounds/start.mp3',
  PAUSE: '/sounds/pause.mp3',
  RESET: '/sounds/reset.mp3',
  COMPLETE: '/sounds/complete.mp3',
  ACHIEVEMENT: '/sounds/achievement.mp3',
}

export const SOUND_CONFIG = {
  CLICK: { volume: 0.15, interrupt: true },
  HOVER: { volume: 0.05, interrupt: true, throttleMs: 180 },
  START: { volume: 0.25, interrupt: true },
  PAUSE: { volume: 0.15, interrupt: true },
  RESET: { volume: 0.2, interrupt: true },
  COMPLETE: { volume: 0.4, interrupt: true },
  ACHIEVEMENT: { volume: 0.5, interrupt: true },
}
