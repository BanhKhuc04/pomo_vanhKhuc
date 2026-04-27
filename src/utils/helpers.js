// Format seconds into MM:SS
export const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

// Format minutes to "Xh Ym" or "Ym"
export const formatDuration = (totalMinutes) => {
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  if (h === 0) return `${m}m`
  return `${h}h ${m}m`
}

// Get today's date string (YYYY-MM-DD)
export const todayKey = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// Get yesterday's date string
export const yesterdayKey = () => {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// Compute days difference between two YYYY-MM-DD strings
export const daysBetween = (a, b) => {
  if (!a || !b) return Infinity
  const d1 = new Date(a)
  const d2 = new Date(b)
  return Math.round((d2 - d1) / (1000 * 60 * 60 * 24))
}

// Determine time-of-day phase
// Returns: 'sunrise' (5-7), 'day' (7-17), 'sunset' (17-19), 'night' (19-5)
export const getTimePhase = (hour = new Date().getHours()) => {
  if (hour >= 5 && hour < 7) return 'sunrise'
  if (hour >= 7 && hour < 17) return 'day'
  if (hour >= 17 && hour < 19) return 'sunset'
  return 'night'
}

// Should be dark mode based on hour (auto)
export const isNightHour = (hour = new Date().getHours()) => {
  return hour >= 18 || hour < 6
}

// Random integer
export const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// Clamp number
export const clamp = (n, min, max) => Math.max(min, Math.min(max, n))

// Browser notification (with permission request)
export const notify = (title, body, icon = '🍅') => {
  if (!('Notification' in window)) return
  if (Notification.permission === 'granted') {
    new Notification(title, { body, icon: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${icon}</text></svg>` })
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission()
  }
}

export const requestNotificationPermission = () => {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission()
  }
}
