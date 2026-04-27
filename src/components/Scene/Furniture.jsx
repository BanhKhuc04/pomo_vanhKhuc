import React from 'react'
import { motion } from 'framer-motion'
import { usePomo } from '../../context/PomoContext'
import { MODES } from '../../data/constants'

/**
 * Bookshelf, desk, chair, plant, rug, poster.
 * Book count grows with totalPomos (capped at shelf size).
 */
export default function Furniture() {
  const { stats, mode, isRunning } = usePomo()
  const bookCount = Math.min(stats.totalPomos, 15)
  const books = ['📕', '📗', '📘', '📙', '📔', '📓', '📒', '📚']

  return (
    <>
      {/* Poster trên tường (góc trên trái) */}
      <div className="absolute top-2 left-2 sm:left-4 w-8 h-10 pixel-border pixel-shadow-sm bg-pink dark:bg-rose-700 z-10 flex items-center justify-center">
        <span className="text-base">🌸</span>
      </div>

      {/* Đồng hồ tường (góc trên phải) */}
      <div className="absolute top-2 right-2 sm:right-4 w-8 h-8 pixel-border pixel-shadow-sm bg-cream dark:bg-nightCard z-10 flex items-center justify-center">
        <span className="text-sm">🕐</span>
      </div>

      {/* Kệ sách - góc dưới trái, đứng trên sàn */}
      <div className="absolute left-2 sm:left-4 bottom-[22%] w-12 sm:w-16 z-10">
        <div className="pixel-border pixel-shadow no-rounded bg-woodDark dark:bg-purple-900 p-[2px] flex flex-col gap-[2px]">
          {[0, 1, 2].map(shelf => (
            <div key={shelf} className="bg-wood dark:bg-purple-800 h-4 flex items-end justify-center gap-[1px] px-[1px] border-b border-ink dark:border-night">
              {books.slice(shelf * 3, shelf * 3 + 3).map((b, i) => {
                const idx = shelf * 3 + i
                if (idx >= bookCount) return <div key={i} className="w-2 h-3 opacity-0" />
                return <span key={i} className="text-[10px] leading-none">{b}</span>
              })}
              {bookCount === 0 && shelf === 0 && <span className="text-[8px] opacity-50">—</span>}
            </div>
          ))}
          {/* Cây kiểng trên đỉnh kệ */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-base animate-sway origin-bottom">🪴</div>
        </div>
      </div>

      {/* Thảm trải sàn */}
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[55%] h-2 sm:h-3 pixel-border bg-pink dark:bg-rose-800 z-[5]">
        <div className="w-full h-full flex">
          <div className="flex-1 bg-pink dark:bg-rose-800" />
          <div className="flex-1 bg-orange dark:bg-amber-700" />
          <div className="flex-1 bg-pink dark:bg-rose-800" />
          <div className="flex-1 bg-orange dark:bg-amber-700" />
          <div className="flex-1 bg-pink dark:bg-rose-800" />
        </div>
      </div>

      {/* Bàn học - góc dưới phải, đứng trên sàn */}
      <div className="absolute right-2 sm:right-4 bottom-[22%] z-10">
        <div className="relative group">
          {/* Mặt bàn */}
          <div className="w-16 sm:w-20 h-2 pixel-border bg-woodDark dark:bg-purple-900 group-hover:bg-woodDark/80 transition-colors" />
          {/* Chân bàn */}
          <div className="flex justify-between w-16 sm:w-20">
            <div className="w-[6px] h-5 bg-woodDark dark:bg-purple-900 pixel-border" />
            <div className="w-[6px] h-5 bg-woodDark dark:bg-purple-900 pixel-border" />
          </div>
          {/* Đồ vật trên bàn: sách, bút, ly trà */}
          <div className="absolute -top-4 left-0 flex items-end gap-[2px]">
            <span className="text-xs animate-pixel-bounce" style={{ animationDelay: '0.5s' }}>📖</span>
            <span className="text-xs">✏️</span>
          </div>
          {/* Tea cup only appears during breaks or if not running focus */}
          {(mode !== MODES.FOCUS || !isRunning) && (
            <motion.div 
              initial={{ scale: 0, y: 5 }}
              animate={{ scale: 1, y: 0 }}
              className="absolute -top-4 right-0 text-xs cursor-help"
              title="Steaming tea..."
            >
              <span className="relative">
                ☕
                <motion.span 
                  className="absolute -top-2 left-1 text-[8px] opacity-60"
                  animate={{ y: [-2, -5], opacity: [0.6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ~
                </motion.span>
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
