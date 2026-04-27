import React, { useEffect } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { usePomo } from '../../context/PomoContext'
import clsx from 'clsx'

export default function TimerControls() {
  const { isRunning, toggleTimer, resetTimer } = usePomo()

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      const tag = e.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.code === 'Space') { e.preventDefault(); toggleTimer() }
      else if (e.key === 'r' || e.key === 'R') resetTimer()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [toggleTimer, resetTimer])

  return (
    <div className="flex items-center justify-center gap-4 mt-2 w-[80%] max-w-[300px]">
      {/* START / PAUSE — main CTA */}
      <button
        onClick={toggleTimer}
        aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        className={clsx(
          'pixel-text text-[11px] sm:text-xs flex items-center justify-center gap-2 py-3.5 rounded-md uppercase w-full flex-1',
          'transition-all duration-100 active:scale-95',
          'text-white bg-vioDark hover:bg-vio border border-vio shadow-[0_0_15px_rgba(124,58,237,0.3)]',
        )}
      >
        {isRunning
          ? <><Pause size={16} fill="currentColor" /> Pause</>
          : <><Play  size={16} fill="currentColor" /> Start</>}
      </button>

      {/* RESET — secondary */}
      <button
        onClick={resetTimer}
        aria-label="Reset timer"
        className={clsx(
          'pixel-text text-[11px] sm:text-xs flex items-center justify-center gap-2 py-3.5 rounded-md uppercase flex-1',
          'transition-all duration-100 active:scale-95',
          'text-textMuted border border-panelBorder bg-transparent hover:text-textMain hover:border-textMuted',
        )}
      >
        <RotateCcw size={14} /> Reset
      </button>
    </div>
  )
}
