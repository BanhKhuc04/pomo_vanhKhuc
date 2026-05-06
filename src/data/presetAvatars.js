export const MALE_AVATAR_IMAGE = '/images/avatars/nam.png'
export const FEMALE_AVATAR_IMAGE = '/images/avatars/nu.png'
export const MALE_SCENE_DARK = '/images/scene/cozy-coder-room.png'
export const MALE_SCENE_LIGHT = '/images/scene/cozy-coder-room1.png'
export const FEMALE_SCENE_DARK = '/images/scene/cozy-girl-coder-room.png'
export const FEMALE_SCENE_LIGHT = '/images/scene/cozy-girl-coder-room1.png'

export const PROFILE_AVATAR_BASES = [
  {
    id: 'male',
    label: 'Male avatar',
    description: 'Classic cozy coder setup',
    src: MALE_AVATAR_IMAGE,
    sceneDark: MALE_SCENE_DARK,
    sceneLight: MALE_SCENE_LIGHT,
  },
  {
    id: 'female',
    label: 'Female avatar',
    description: 'Warm study room setup',
    src: FEMALE_AVATAR_IMAGE,
    sceneDark: FEMALE_SCENE_DARK,
    sceneLight: FEMALE_SCENE_LIGHT,
  },
]

export const DEFAULT_AVATAR_BASE = PROFILE_AVATAR_BASES[0].id

export function getAvatarBaseMeta(base) {
  return PROFILE_AVATAR_BASES.find((item) => item.id === base) || PROFILE_AVATAR_BASES[0]
}

export function getAvatarImageForBase(base) {
  return getAvatarBaseMeta(base).src
}

export function getSceneImagesForBase(base) {
  const meta = getAvatarBaseMeta(base)
  return {
    sceneDark: meta.sceneDark,
    sceneLight: meta.sceneLight,
  }
}
