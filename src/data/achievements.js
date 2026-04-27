export const ACHIEVEMENTS = [
  {
    id: 'first_bloom',
    name: 'First Bloom',
    emoji: '🌸',
    description: 'Complete your first Pomodoro',
    check: ({ totalPomos }) => totalPomos >= 1
  },
  {
    id: 'night_owl',
    name: 'Night Owl',
    emoji: '🦉',
    description: 'Study after 10 PM',
    check: ({ hour }) => hour !== undefined && hour >= 22
  },
  {
    id: 'early_bird',
    name: 'Early Bird',
    emoji: '🐦',
    description: 'Study before 7 AM',
    check: ({ hour }) => hour !== undefined && hour < 7
  },
  {
    id: 'week_warrior',
    name: 'Week Warrior',
    emoji: '⚔️',
    description: 'Maintain a 7-day streak',
    check: ({ streak }) => streak >= 7
  },
  {
    id: 'study_master',
    name: 'Study Master',
    emoji: '📖',
    description: 'Complete 100 Pomodoros total',
    check: ({ totalPomos }) => totalPomos >= 100
  },
  {
    id: 'garden_keeper',
    name: 'Garden Keeper',
    emoji: '🌻',
    description: 'Grow all 19 plants in one day',
    check: ({ todayPomos }) => todayPomos >= 19
  }
]

export const getAchievementById = (id) => ACHIEVEMENTS.find(a => a.id === id)
