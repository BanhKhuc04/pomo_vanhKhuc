import React from 'react'
import clsx from 'clsx'
import Window from './Window'
import Furniture from './Furniture'
import Pet from './Pet'
import Candle from './Candle'
import AvatarCharacter from '../Character/AvatarCharacter'
import { usePomo } from '../../context/PomoContext'
import { MODES } from '../../data/constants'

/**
 * Derives animationState from Pomodoro state.
 * Priority: celebrate > typing (focus+running) > relax (break) > idle
 */
function deriveAnimationState({ isRunning, mode, sessionJustCompleted }) {
  if (sessionJustCompleted)                                    return 'celebrate'
  if (isRunning && mode === MODES.FOCUS)                       return 'typing'
  if (mode === MODES.SHORT_BREAK || mode === MODES.LONG_BREAK) return 'relax'
  return 'idle'
}

export default function PixelRoom() {
  const { isRunning, mode, sessionJustCompleted, characterConfig } = usePomo()
  const animationState = deriveAnimationState({ isRunning, mode, sessionJustCompleted })

  return (
    <div
      className={clsx(
        'relative w-full h-full overflow-hidden flex-none pointer-events-none',
        'aspect-[16/9] lg:aspect-auto lg:h-full'
      )}
    >
      {/* Background Image (Target Scene) */}
      <img
        src="/images/scene/room-bg.png"
        alt="Cozy Room"
        className="absolute inset-0 w-full h-full object-cover pixelated"
      />

      {/* ── Avatar Character ── */}
      {/*
       * Positioned so it sits in front of the desk in the background image.
       */}
      <div
        className="absolute z-20"
        style={{
          bottom: '22%',
          left: '30%',
          transform: 'scale(1.2)'
        }}
      >
        <AvatarCharacter
          config={characterConfig}
          animationState={animationState}
          size="lg"
        />
      </div>
    </div>
  )
}
