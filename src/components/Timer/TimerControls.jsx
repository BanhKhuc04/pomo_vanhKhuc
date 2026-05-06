import React, { useEffect } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { usePomo } from '../../context/PomoContext'
import clsx from 'clsx'

export default function TimerControls() {
  const { isRunning, toggleTimer, resetTimer, t } = usePomo()

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
    <div className="timer-controls-row flex items-center justify-center gap-3 mt-1 w-full max-w-[760px]">
      {/* START / PAUSE — main CTA */}
      <button
        onClick={toggleTimer}
        aria-label={isRunning ? t('timer.pause') : t('timer.start')}
        className={clsx(
          'timer-control-btn pixel-text text-[10px] sm:text-[11px] flex items-center justify-center gap-2 py-3.5 rounded-xl uppercase w-full flex-[1.25]',
          'transition-all duration-150 active:scale-[0.98] hover:brightness-110',
          'text-white border shadow-[0_0_0_1px_rgba(171,148,255,0.34),0_18px_40px_rgba(90,62,210,0.32)]',
        )}
        style={{ background: 'var(--app-primary-btn-bg)', borderColor: 'var(--app-primary-btn-border)' }}
      >
        {isRunning
          ? <><Pause size={16} fill="currentColor" /> {t('timer.pause')}</>
          : <><Play  size={16} fill="currentColor" /> {t('timer.start')}</>}
      </button>

      {/* RESET — secondary */}
      <button
        onClick={resetTimer}
        aria-label={t('timer.reset')}
        className={clsx(
          'timer-control-btn pixel-text text-[10px] sm:text-[11px] flex items-center justify-center gap-2 py-3.5 rounded-xl uppercase flex-1',
          'transition-all duration-150 active:scale-[0.98]',
          'app-secondary-btn',
        )}
      >
        <RotateCcw size={14} /> {t('timer.reset')}
      </button>
    </div>
  )
}
