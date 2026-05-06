import {
  DEFAULT_AVATAR_BASE,
  FEMALE_AVATAR_IMAGE,
  getAvatarImageForBase,
  getSceneImagesForBase,
  MALE_AVATAR_IMAGE,
} from './presetAvatars'

export const DEFAULT_PROFILE = {
  displayName: 'Coder',
  avatarBase: DEFAULT_AVATAR_BASE,
  avatarAccessory: 'none',
  avatarImage: getAvatarImageForBase(DEFAULT_AVATAR_BASE),
  ...getSceneImagesForBase(DEFAULT_AVATAR_BASE),
}

function normalizeDisplayName(raw) {
  if (typeof raw === 'string' && raw.trim()) {
    return raw.trim().slice(0, 30)
  }
  return DEFAULT_PROFILE.displayName
}

function inferLegacyAvatarBase(raw) {
  const avatarString = typeof raw === 'string' ? raw.toLowerCase() : ''
  if (
    avatarString.includes('female') ||
    avatarString.includes('girl') ||
    avatarString.includes('nu.png') ||
    avatarString.includes('/nu')
  ) return 'female'
  return 'male'
}

export function normalizeProfile(raw) {
  if (!raw || typeof raw !== 'object') return { ...DEFAULT_PROFILE }

  const displayName = normalizeDisplayName(raw.displayName ?? raw.name)
  const avatarBase = raw.avatarBase === 'female'
    ? 'female'
    : raw.avatarBase === 'male'
      ? 'male'
      : inferLegacyAvatarBase(raw.avatarImage ?? raw.avatarUrl)

  const avatarAccessory = raw.avatarAccessory === 'none' ? 'none' : DEFAULT_PROFILE.avatarAccessory
  const avatarImageCandidate = typeof raw.avatarImage === 'string' && raw.avatarImage.trim()
    ? raw.avatarImage.trim()
    : typeof raw.avatarUrl === 'string' && raw.avatarUrl.trim()
      ? raw.avatarUrl.trim()
      : ''

  const avatarImage = avatarImageCandidate || getAvatarImageForBase(avatarBase)
  const defaultScenes = getSceneImagesForBase(avatarBase)
  const sceneDark = typeof raw.sceneDark === 'string' && raw.sceneDark.trim()
    ? raw.sceneDark.trim()
    : defaultScenes.sceneDark
  const sceneLight = typeof raw.sceneLight === 'string' && raw.sceneLight.trim()
    ? raw.sceneLight.trim()
    : defaultScenes.sceneLight

  return {
    displayName,
    avatarBase,
    avatarAccessory,
    avatarImage,
    sceneDark,
    sceneLight,
  }
}

export function applyAvatarBase(profile, avatarBase) {
  const base = avatarBase === 'female' ? 'female' : 'male'
  return normalizeProfile({
    ...profile,
    avatarBase: base,
    avatarImage: getAvatarImageForBase(base),
    ...getSceneImagesForBase(base),
  })
}

export const PROFILE_IMAGE_FALLBACKS = {
  male: MALE_AVATAR_IMAGE,
  female: FEMALE_AVATAR_IMAGE,
}

export const LEGACY_PROFILE_KEYS = ['name', 'avatarType', 'avatarUrl']

export { getAvatarImageForBase, MALE_AVATAR_IMAGE, FEMALE_AVATAR_IMAGE }
