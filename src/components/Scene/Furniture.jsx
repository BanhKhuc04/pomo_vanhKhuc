import React from 'react'
import { motion } from 'framer-motion'
import { usePomo } from '../../context/PomoContext'
import { MODES } from '../../data/constants'

/**
 * Coder room furniture:
 * - Bookshelf (left) with books that grow with pomodoros
 * - Coder desk (right) with monitor, laptop glow, lamp, coffee, plant
 * - Neon "FOCUS" sign on right wall
 * - "KEEP CALM & CODE ON" mini poster
 * - Small rug on floor
 */
export default function Furniture() {
  const { stats, mode, isRunning } = usePomo()
  const bookCount = Math.min(stats.totalPomos, 15)
  const books = ['📕', '📗', '📘', '📙', '📔', '📓', '📒', '📚']
  const isFocusing = isRunning && mode === MODES.FOCUS
  const isBreak = !isFocusing

  return (
    <>
      {/* ── NEON "FOCUS" sign — top right wall ── */}
      <div className="absolute top-[8%] right-[6%] z-10">
        <div
          className="px-2 py-1 border-2 text-center"
          style={{
            borderColor: '#7C3AED',
            background: 'rgba(124,58,237,0.08)',
          }}
        >
          <motion.span
            className="pixel-text text-[9px] sm:text-[11px] text-vio animate-neon block"
            animate={isFocusing
              ? { textShadow: ['0 0 8px #7C3AED, 0 0 20px #7C3AED', '0 0 4px #7C3AED', '0 0 8px #7C3AED, 0 0 20px #7C3AED'] }
              : { textShadow: '0 0 4px #7C3AED60' }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            FOCUS
          </motion.span>
        </div>
      </div>

      {/* ── Mini poster "CODE ON" — upper left ── */}
      <div className="absolute top-[8%] left-[6%] w-8 h-10 sm:w-10 sm:h-12 border-2 border-panelBorder z-10 flex items-center justify-center"
           style={{ background: '#1A1650', boxShadow: '2px 2px 0 #0D0B1A' }}>
        <span className="pixel-text text-[5px] sm:text-[6px] text-textMuted leading-tight text-center px-[2px]">
          KEEP{'\n'}CALM{'\n'}&amp;{'\n'}CODE
        </span>
      </div>

      {/* ── Clock — upper center-right ── */}
      <div className="absolute top-[8%] right-[28%] z-10 border-2 border-panelBorder w-7 h-7 flex items-center justify-center"
           style={{ background: '#17142B' }}>
        <span className="text-sm">🕐</span>
      </div>

      {/* ── Bookshelf — left side, floor ── */}
      <div className="absolute left-[4%] sm:left-[5%] bottom-[20%] w-12 sm:w-14 z-10">
        <div className="border-2 border-[#2A1F4A] flex flex-col gap-[2px] p-[2px]"
             style={{ background: '#1E1A3A', boxShadow: '3px 3px 0 #0D0B1A' }}>
          {[0, 1, 2].map(shelf => (
            <div key={shelf} className="h-4 flex items-end justify-center gap-[1px] px-[1px] border-b border-[#2A1F4A]"
                 style={{ background: '#17142B' }}>
              {books.slice(shelf * 3, shelf * 3 + 3).map((b, i) => {
                const idx = shelf * 3 + i
                if (idx >= bookCount) return <div key={i} className="w-2 h-3 opacity-0" />
                return <span key={i} className="text-[10px] leading-none pixel-emoji">{b}</span>
              })}
              {bookCount === 0 && shelf === 0 && <span className="text-[8px] opacity-30 text-textMuted">—</span>}
            </div>
          ))}
        </div>
        {/* Plant on top of shelf */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-base animate-sway origin-bottom z-20">🪴</div>
      </div>

      {/* ── Rug on floor ── */}
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[52%] h-2 z-[5] border border-panelBorder">
        <div className="w-full h-full flex">
          {['#4B3B78','#7C3AED','#4B3B78','#4F46E5','#4B3B78'].map((c, i) => (
            <div key={i} className="flex-1" style={{ background: c }} />
          ))}
        </div>
      </div>

      {/* ── DESK — right side ── */}
      <div className="absolute right-[4%] sm:right-[5%] bottom-[20%] z-10">
        {/* Desk top */}
        <div className="w-[90px] sm:w-[110px] h-2 border-2 border-[#2A1F4A]"
             style={{ background: '#241F45', boxShadow: '3px 3px 0 #0D0B1A' }} />
        {/* Desk legs */}
        <div className="flex justify-between w-[90px] sm:w-[110px]">
          <div className="w-[6px] h-5 border border-[#2A1F4A]" style={{ background: '#241F45' }} />
          <div className="w-[6px] h-5 border border-[#2A1F4A]" style={{ background: '#241F45' }} />
        </div>

        {/* Desk items: lamp + monitor + coffee */}
        <div className="absolute -top-14 sm:-top-16 left-0 right-0 flex items-end justify-between px-1">

          {/* Desk lamp — left */}
          <div className="flex flex-col items-center z-10">
            {/* Lamp shade */}
            <div className="w-6 h-3 border-2 border-[#4B3B78]"
                 style={{ background: '#FBBF24', boxShadow: isFocusing ? '0 4px 10px #FBBF2480, 0 8px 20px #FBBF2440' : 'none' }} />
            {/* Lamp arm */}
            <div className="w-[3px] h-4 bg-[#4B3B78]" />
            {/* Lamp base */}
            <div className="w-6 h-[3px] bg-[#4B3B78]" />
            {/* Light cone (only when focusing) */}
            {isFocusing && (
              <motion.div
                className="absolute top-3 left-0 w-10 h-12 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(251,191,36,0.18) 0%, transparent 100%)',
                  clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                }}
                animate={{ opacity: [0.8, 0.5, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>

          {/* Monitor — center */}
          <div className="flex flex-col items-center relative">
            {/* Screen */}
            <motion.div
              className="w-10 sm:w-12 h-7 sm:h-8 border-2 border-[#4B3B78] animate-monitor"
              style={{
                background: isFocusing
                  ? 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #1E1B4B 100%)'
                  : '#0D0B1A',
                boxShadow: isFocusing ? '0 0 10px #4F46E5, 0 0 20px #4F46E560' : 'none',
              }}
            >
              {/* Code lines on screen */}
              {isFocusing && (
                <div className="absolute inset-1 flex flex-col gap-[2px] overflow-hidden">
                  {[...Array(5)].map((_, i) => (
                    <motion.div key={i} className="h-[2px] rounded-none"
                      style={{
                        background: ['#7C3AED', '#4F46E5', '#A78BFA', '#818CF8', '#C4B5FD'][i],
                        width: `${[80, 60, 90, 50, 70][i]}%`,
                      }}
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
                    />
                  ))}
                  {/* Cursor blink */}
                  <motion.div className="w-[2px] h-[3px] bg-textMain mt-[1px]"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }} />
                </div>
              )}
            </motion.div>
            {/* Monitor stand */}
            <div className="w-[3px] h-3 bg-[#4B3B78]" />
            <div className="w-6 h-[3px] bg-[#4B3B78]" />
          </div>

          {/* Coffee cup — right */}
          {isBreak && (
            <motion.div initial={{ scale: 0, y: 5 }} animate={{ scale: 1, y: 0 }}
              className="relative text-xs cursor-help" title="Coffee break!">
              ☕
              <motion.span className="absolute -top-3 left-1 text-[8px] text-textMuted"
                animate={{ y: [-2,-5], opacity: [0.6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}>
                ~
              </motion.span>
            </motion.div>
          )}
          {isFocusing && (
            <div className="text-xs opacity-60 cursor-help" title="Cold coffee while coding">☕</div>
          )}
        </div>

        {/* Small plant on desk corner */}
        <div className="absolute -top-7 -left-5 text-sm animate-sway origin-bottom">🌱</div>
      </div>
    </>
  )
}
