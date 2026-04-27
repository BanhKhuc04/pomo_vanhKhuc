import React, { useEffect } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { usePomo } from '../../context/PomoContext'
import clsx from 'clsx'

export default function TimerControls() {
  const { isRunning, toggleTimer, resetTimer } = usePomo()

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (document?.documentElement?.dataset?.modal) return
      const tag = e.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.code === 'Space') { e.preventDefault(); toggleTimer() }
      else if (e.key === 'r' || e.key === 'R') resetTimer()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [toggleTimer, resetTimer])

  return (
    <div className="flex items-center justify-center gap-4 mt-1 w-full max-w-[760px]">
      {/* START / PAUSE — main CTA */}
      <button
        onClick={toggleTimer}
        aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        className={clsx(
          'pixel-text text-[13px] sm:text-[14px] flex items-center justify-center gap-2 py-[19px] rounded-xl uppercase w-full flex-[1.25]',
          'transition-all duration-150 active:scale-[0.98] hover:brightness-110',
          'text-white border border-[#9B7CFF] shadow-[0_0_0_1px_rgba(171,148,255,0.34),0_18px_40px_rgba(90,62,210,0.5)]',
        )}
        style={{ background: 'linear-gradient(180deg, #6E42F1 0%, #5A35CA 42%, #4A2BAF 100%)' }}
      >
        {isRunning
          ? <><Pause size={17} fill="currentColor" /> Pause</>
          : <><Play  size={17} fill="currentColor" /> Start</>}
      </button>

      {/* RESET — secondary */}
      <button
        onClick={resetTimer}
        aria-label="Reset timer"
        className={clsx(
          'pixel-text text-[13px] sm:text-[14px] flex items-center justify-center gap-2 py-[19px] rounded-xl uppercase flex-1',
          'transition-all duration-150 active:scale-[0.98]',
          'text-[#D6CEF7] border border-[#5B4F91] bg-gradient-to-b from-[#181B3E] to-[#10122D] hover:text-textMain hover:border-[#7C6BBE]',
        )}
      >
        <RotateCcw size={15} /> Reset
      </button>
    </div>
  )
}
