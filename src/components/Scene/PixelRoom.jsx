import React from 'react'
import { usePomo } from '../../context/PomoContext'
import { DEFAULT_AVATAR_BASE, getSceneImagesForBase } from '../../data/presetAvatars'

export default function PixelRoom() {
  const { profile, resolvedTheme } = usePomo()
  const avatarBase = profile?.avatarBase || DEFAULT_AVATAR_BASE
  const defaultScenes = getSceneImagesForBase(avatarBase)
  const isDark = resolvedTheme === 'dark'
  const roomImage = isDark
    ? profile?.sceneDark || defaultScenes.sceneDark
    : profile?.sceneLight || defaultScenes.sceneLight

  return (
    <div
      className="relative w-full h-full overflow-hidden pointer-events-none"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, #100d28 0%, #18153d 54%, #0c0b22 100%)'
          : 'linear-gradient(180deg, #e6ebff 0%, #d9e4ff 44%, #c8d5fb 100%)',
      }}
    >
      <div
        className="absolute inset-0 scale-[1.02]"
        style={{
          backgroundImage: `url(${roomImage})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          filter: isDark
            ? 'brightness(0.72) saturate(0.94)'
            : 'brightness(0.96) saturate(1.02)',
          opacity: 1,
          transformOrigin: 'center',
        }}
      />
      <img
        src={roomImage}
        alt="Cozy Room"
        className="absolute inset-0 z-[1] w-full h-full object-contain object-center pixelated select-none"
        style={{
          filter: isDark
            ? 'brightness(0.94) contrast(1.04) saturate(0.98)'
            : 'brightness(1.08) contrast(1.02) saturate(1.04)',
        }}
      />

      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 18% 63%, rgba(255,176,102,0.14) 0%, rgba(255,176,102,0.04) 25%, rgba(0,0,0,0) 48%), radial-gradient(circle at 62% 19%, rgba(88,111,255,0.14) 0%, rgba(88,111,255,0.04) 26%, rgba(0,0,0,0) 58%)'
            : 'radial-gradient(circle at 14% 28%, rgba(255,230,168,0.28) 0%, rgba(255,230,168,0.08) 24%, rgba(0,0,0,0) 46%), radial-gradient(circle at 76% 18%, rgba(125,168,255,0.18) 0%, rgba(125,168,255,0.06) 24%, rgba(0,0,0,0) 56%)',
        }}
      />
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background: isDark
            ? 'linear-gradient(180deg, rgba(10,9,29,0.04) 0%, rgba(10,9,29,0.02) 42%, rgba(9,9,21,0.16) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(238,242,255,0.08) 38%, rgba(122,138,191,0.14) 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-[4] border rounded-[inherit]"
        style={{
          borderColor: isDark ? '#3F3676' : '#AEBEF7',
          boxShadow: isDark
            ? 'inset 0 0 0 1px rgba(82,66,150,0.32)'
            : 'inset 0 0 0 1px rgba(255,255,255,0.42)',
        }}
      />
      <div
        className="absolute inset-0 z-[5] rounded-[inherit]"
        style={{
          boxShadow: isDark
            ? 'inset 0 -34px 70px rgba(8,7,22,0.26), inset 0 18px 40px rgba(10,10,25,0.14)'
            : 'inset 0 -24px 58px rgba(99,114,176,0.14), inset 0 14px 34px rgba(255,255,255,0.28)',
        }}
      />
      <div
        className="absolute inset-0 z-[6]"
        style={{
          opacity: isDark ? 0.05 : 0.03,
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.24), rgba(255,255,255,0.24) 1px, transparent 1px, transparent 3px)',
          mixBlendMode: isDark ? 'screen' : 'soft-light',
        }}
      />
    </div>
  )
}
