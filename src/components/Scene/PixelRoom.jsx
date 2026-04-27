import React from 'react'
import clsx from 'clsx'
import Window from './Window'
import Furniture from './Furniture'
import Character from './Character'
import Pet from './Pet'
import Candle from './Candle'
import { usePomo } from '../../context/PomoContext'

export default function PixelRoom() {
  const { isDark } = usePomo()
  return (
    <div className={clsx(
      // Tỉ lệ khung hình rộng-thấp + giới hạn chiều cao tối đa để giữ layout 1 trang
      'relative w-full aspect-[16/9] max-h-[280px] sm:max-h-[320px] pixel-border-thick pixel-shadow no-rounded overflow-hidden game-element',
      isDark
        ? 'bg-gradient-to-b from-purple-950 via-night to-purple-900'
        : 'bg-gradient-to-b from-pink/40 via-cream to-wood/30'
    )}>
      {/* Wallpaper pattern (subtle) */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(circle, #5C6BC0 1px, transparent 1px)'
            : 'radial-gradient(circle, #C9A57B 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Sàn nhà - chiếm 22% chiều cao đáy phòng */}
      <div className={clsx(
        'absolute bottom-0 left-0 right-0 h-[22%]',
        isDark ? 'bg-purple-900' : 'bg-wood'
      )}>
        {/* Wood plank lines */}
        <div className="absolute inset-0 flex flex-col">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={clsx(
              'flex-1 border-t-2',
              isDark ? 'border-purple-950' : 'border-woodDark/50'
            )} />
          ))}
        </div>
      </div>

      {/* Đường viền giữa tường và sàn */}
      <div className={clsx(
        'absolute left-0 right-0 h-[3px]',
        isDark ? 'bg-purple-950' : 'bg-woodDark'
      )} style={{ bottom: '22%' }} />

      {/* Window centered top */}
      <Window />

      {/* Furniture: shelf, desk, rug */}
      <Furniture />

      {/* Candle on shelf area */}
      <Candle />

      {/* Pet wandering */}
      <Pet />

      {/* Character */}
      <Character />
    </div>
  )
}
