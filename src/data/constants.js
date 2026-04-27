// Timer modes
export const MODES = {
  FOCUS: 'focus',
  SHORT_BREAK: 'short_break',
  LONG_BREAK: 'long_break'
};

export const MODE_EMOJI = {
  [MODES.FOCUS]: '🍅',
  [MODES.SHORT_BREAK]: '☕',
  [MODES.LONG_BREAK]: '😴'
};

export const MODE_LABELS = {
  [MODES.FOCUS]: 'Focus',
  [MODES.SHORT_BREAK]: 'Short Break',
  [MODES.LONG_BREAK]: 'Long Break'
};

// Default durations in minutes
export const DEFAULT_DURATIONS = {
  [MODES.FOCUS]: 25,
  [MODES.SHORT_BREAK]: 5,
  [MODES.LONG_BREAK]: 15
};

// Application settings defaults
export const DEFAULT_SETTINGS = {
  durations: { ...DEFAULT_DURATIONS },
  musicVolume: 0.5,
  sfxVolume: 0.7,
  tickEnabled: false,
  autoDarkMode: true,
  notificationsEnabled: true
};

// Initial statistics
export const DEFAULT_STATS = {
  totalPomos: 0,
  todayPomos: 0,
  todayMinutes: 0,
  lastDate: ''
};

// Local storage keys
export const STORAGE_KEYS = {
  SETTINGS: 'pomo_settings',
  STATS: 'pomo_stats',
  GARDEN: 'pomo_garden',
  STREAK: 'pomo_streak',
  ACHIEVEMENTS: 'pomo_achievements',
  TASKS: 'pomo_tasks'
};

// Pomodoro cycle settings
export const SESSIONS_BEFORE_LONG = 4;
export const GARDEN_SIZE = 19; // Updated from 8 to 19

// Garden plant stages
export const PLANT_STAGES = {
  EMPTY: 0,
  BLOOM: 1
};

// Emoji fallbacks (if needed)
export const PLANT_EMOJIS = {
  [PLANT_STAGES.BLOOM]: '🌻'
};
