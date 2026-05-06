// Timer modes
export const MODES = {
  FOCUS: 'focus',
  SHORT_BREAK: 'short_break',
  LONG_BREAK: 'long_break'
}

export const MODE_EMOJI = {
  [MODES.FOCUS]: '🍅',
  [MODES.SHORT_BREAK]: '☕',
  [MODES.LONG_BREAK]: '😴'
}

export const MODE_LABELS = {
  [MODES.FOCUS]: 'Focus',
  [MODES.SHORT_BREAK]: 'Short Break',
  [MODES.LONG_BREAK]: 'Long Break'
}

export const THEME_MODES = {
  DARK: 'dark',
  LIGHT: 'light',
  AUTO: 'auto',
}

export const APP_LANGUAGES = {
  EN: 'en',
  VI: 'vi',
}

export const LANGUAGE_OPTIONS = [
  { id: APP_LANGUAGES.EN, label: 'English', shortLabel: 'EN', locale: 'en-US', icon: '🇺🇸' },
  { id: APP_LANGUAGES.VI, label: 'Tiếng Việt', shortLabel: 'VI', locale: 'vi-VN', icon: '🇻🇳' },
]

export const DEFAULT_APP_NAME = 'POMO TIME'

// Default durations in minutes
export const DEFAULT_DURATIONS = {
  [MODES.FOCUS]: 25,
  [MODES.SHORT_BREAK]: 5,
  [MODES.LONG_BREAK]: 15
}

// Application settings defaults
export const DEFAULT_SETTINGS = {
  appName: DEFAULT_APP_NAME,
  themeMode: THEME_MODES.DARK,
  locale: APP_LANGUAGES.EN,
  durations: { ...DEFAULT_DURATIONS },
  musicVolume: 0.5,
  sfxVolume: 0.7,
  tickEnabled: false,
  autoDarkMode: true,
  notificationsEnabled: true,
}

export function normalizeSettings(raw) {
  const source = raw && typeof raw === 'object' ? raw : {}
  const themeMode = Object.values(THEME_MODES).includes(source.themeMode)
    ? source.themeMode
    : THEME_MODES.DARK
  const locale = Object.values(APP_LANGUAGES).includes(source.locale)
    ? source.locale
    : APP_LANGUAGES.EN

  const appName = typeof source.appName === 'string' && source.appName.trim()
    ? source.appName.trim().slice(0, 36)
    : DEFAULT_APP_NAME

  return {
    ...DEFAULT_SETTINGS,
    ...source,
    appName,
    themeMode,
    locale,
    durations: {
      ...DEFAULT_DURATIONS,
      ...(source.durations || {}),
    },
  }
}

// Initial statistics
export const DEFAULT_STATS = {
  totalPomos: 0,
  todayPomos: 0,
  todayMinutes: 0,
  lastDate: ''
}

// Local storage keys
export const STORAGE_KEYS = {
  SETTINGS: 'pomo_settings',
  STATS: 'pomo_stats',
  GARDEN: 'pomo_garden',
  STREAK: 'pomo_streak',
  ACHIEVEMENTS: 'pomo_achievements',
  TASKS: 'pomo_tasks',
  THEME: 'pomo_theme'
}

// Pomodoro cycle settings
export const SESSIONS_BEFORE_LONG = 4
export const GARDEN_SIZE = 19

// Garden plant stages
export const PLANT_STAGES = {
  EMPTY: 0,
  BLOOM: 1
}

// Emoji fallbacks (if needed)
export const PLANT_EMOJIS = {
  [PLANT_STAGES.BLOOM]: '🌻'
}
