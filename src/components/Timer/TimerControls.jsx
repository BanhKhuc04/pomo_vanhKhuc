import React, { useEffect } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import PixelButton from '../UI/PixelButton'
import { usePomo } from '../../context/PomoContext'

export default function TimerControls() {
  const { isRunning, toggleTimer, resetTimer } = usePomo()

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      // Avoid firing while typing in inputs
      const tag = e.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.code === 'Space') {
        e.preventDefault()
        toggleTimer()
      } else if (e.key === 'r' || e.key === 'R') {
        resetTimer()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [toggleTimer, resetTimer])

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2">
      <PixelButton
        variant="primary"
        size="lg"
        onClick={toggleTimer}
        ariaLabel={isRunning ? 'Pause timer' : 'Start timer'}
        className="min-w-[140px]"
      >
        {isRunning ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Start</>}
      </PixelButton>
      <PixelButton
        variant="ghost"
        size="lg"
        onClick={resetTimer}
        ariaLabel="Reset timer"
      >
        <RotateCcw size={18} /> Reset
      </PixelButton>
    </div>
  )
}
