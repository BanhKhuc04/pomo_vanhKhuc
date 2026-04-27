// ─── Character Config Options ────────────────────────────────────────────────

export const DEFAULT_CHARACTER_CONFIG = {
  name: 'Coder',
  skinTone: 'peach',
  hairStyle: 'messy',
  hairColor: 'black',
  glasses: 'round',
  outfit: 'hoodie',
  outfitColor: 'purple',
  accessory: 'headphones',
  pet: 'cat',
}

// Normalize / migrate old or partial configs
export function normalizeCharacterConfig(raw) {
  const defaults = DEFAULT_CHARACTER_CONFIG
  if (!raw || typeof raw !== 'object') return { ...defaults }
  return {
    name:        typeof raw.name === 'string' ? raw.name : defaults.name,
    skinTone:    OPTION_IDS.skinTone.includes(raw.skinTone)    ? raw.skinTone    : defaults.skinTone,
    hairStyle:   OPTION_IDS.hairStyle.includes(raw.hairStyle)   ? raw.hairStyle   : defaults.hairStyle,
    hairColor:   OPTION_IDS.hairColor.includes(raw.hairColor)   ? raw.hairColor   : defaults.hairColor,
    glasses:     OPTION_IDS.glasses.includes(raw.glasses)       ? raw.glasses     : defaults.glasses,
    outfit:      OPTION_IDS.outfit.includes(raw.outfit)         ? raw.outfit      : defaults.outfit,
    outfitColor: OPTION_IDS.outfitColor.includes(raw.outfitColor) ? raw.outfitColor : defaults.outfitColor,
    accessory:   OPTION_IDS.accessory.includes(raw.accessory)   ? raw.accessory   : defaults.accessory,
    pet:         OPTION_IDS.pet.includes(raw.pet)               ? raw.pet         : defaults.pet,
  }
}

// Valid IDs for each field (used in normalizer)
export const OPTION_IDS = {
  skinTone:    ['porcelain', 'peach', 'tan', 'deep'],
  hairStyle:   ['short', 'messy', 'side'],
  hairColor:   ['black', 'brown', 'blue'],
  glasses:     ['none', 'round', 'square'],
  outfit:      ['hoodie', 'tshirt', 'sweater'],
  outfitColor: ['black', 'purple', 'blue', 'cream'],
  accessory:   ['none', 'headphones', 'coffee'],
  pet:         ['none', 'cat'],
}

// UI display data for Character Setup Modal
export const CHARACTER_OPTIONS = {
  skinTone: [
    { id: 'porcelain', label: 'Porcelain', hex: '#F6D7C9' },
    { id: 'peach',     label: 'Peach',     hex: '#F3C6A6' },
    { id: 'tan',       label: 'Tan',       hex: '#D9A57B' },
    { id: 'deep',      label: 'Deep',      hex: '#A36A4F' },
  ],
  hairStyle: [
    { id: 'short',  label: 'Short',  emoji: '💇' },
    { id: 'messy',  label: 'Messy',  emoji: '😤' },
    { id: 'side',   label: 'Side',   emoji: '🧑' },
  ],
  hairColor: [
    { id: 'black',  label: 'Black',  hex: '#1A1A2E' },
    { id: 'brown',  label: 'Brown',  hex: '#7B4F2E' },
    { id: 'blue',   label: 'Blue',   hex: '#3B82F6'  },
  ],
  glasses: [
    { id: 'none',   label: 'None',   emoji: '🚫' },
    { id: 'round',  label: 'Round',  emoji: '🔵' },
    { id: 'square', label: 'Square', emoji: '⬛' },
  ],
  outfit: [
    { id: 'hoodie',  label: 'Hoodie',  emoji: '🧥' },
    { id: 'tshirt',  label: 'T-Shirt', emoji: '👕' },
    { id: 'sweater', label: 'Sweater', emoji: '🧣' },
  ],
  outfitColor: [
    { id: 'black',  label: 'Black',  hex: '#1E1B4B' },
    { id: 'purple', label: 'Purple', hex: '#7C3AED' },
    { id: 'blue',   label: 'Blue',   hex: '#2563EB' },
    { id: 'cream',  label: 'Cream',  hex: '#FFF5E1' },
  ],
  accessory: [
    { id: 'none',       label: 'None',       emoji: '—' },
    { id: 'headphones', label: 'Headphones', emoji: '🎧' },
    { id: 'coffee',     label: 'Coffee',     emoji: '☕' },
  ],
  pet: [
    { id: 'none', label: 'No pet', emoji: '—' },
    { id: 'cat',  label: 'Cat',    emoji: '🐱' },
  ],
}

// CSS values per config option — used by AvatarCharacter
export const HAIR_COLOR_HEX = {
  black: '#1A1A2E',
  brown: '#7B4F2E',
  blue:  '#3B82F6',
}

export const OUTFIT_COLOR_HEX = {
  black:  '#1E1B4B',
  purple: '#7C3AED',
  blue:   '#2563EB',
  cream:  '#FDF4DC',
}

export const SKIN_TONE_HEX = {
  porcelain: '#F6D7C9',
  peach:     '#F3C6A6',
  tan:       '#D9A57B',
  deep:      '#A36A4F',
}

export const SKIN_HEX = SKIN_TONE_HEX.peach
