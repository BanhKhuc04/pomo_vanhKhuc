import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePomo } from '../../context/PomoContext'
import { MODES } from '../../data/constants'
import { randInt } from '../../utils/helpers'

export default function Pet() {
  const { mode, isRunning, playSfx, pushToast } = usePomo()
  const [position, setPosition] = useState({ x: 70, flip: false })
  const [petted, setPetted] = useState(false)

  // Random walk: pick a new x every few seconds when focus is running, else slower
  useEffect(() => {
    const moveInterval = isRunning && mode === MODES.FOCUS ? 6000 : 9000
    const id = setInterval(() => {
      const newX = randInt(15, 80)
      setPosition(prev => ({ x: newX, flip: newX < prev.x }))
    }, moveInterval)
    return () => clearInterval(id)
  }, [isRunning, mode])

  const handleClick = () => {
    playSfx('MEOW')
    setPetted(true)
    pushToast({ type: 'info', title: 'Meow!', message: 'Mochi loves you 💕', duration: 2000 })
    setTimeout(() => setPetted(false), 800)
  }

  const isSleeping = mode === MODES.LONG_BREAK || (!isRunning && mode !== MODES.FOCUS)

  return (
    <motion.button
      onClick={handleClick}
      className="absolute bottom-[20%] z-30 cursor-pointer w-12 h-12 sm:w-16 sm:h-16 game-element select-none focus:outline-none"
      style={{ left: `${position.x}%` }}
      animate={{
        left: `${position.x}%`,
        scaleX: position.flip ? -1 : 1,
        scale: petted ? [1, 1.2, 1] : 1
      }}
      transition={{ duration: petted ? 0.4 : 5, ease: 'easeInOut' }}
      aria-label="Pet the cat"
    >
      <motion.img
        src="/images/pet/cat.png"
        alt="Pet cat"
        className="w-full h-full object-contain pixelated"
        animate={isRunning && mode === MODES.FOCUS ? { y: [0, -2, 0] } : { y: 0 }}
        transition={{ duration: 0.5, repeat: isRunning && mode === MODES.FOCUS ? Infinity : 0 }}
      />
      {isSleeping && (
        <span className="absolute -top-1 -right-1 text-xs animate-zzz">💤</span>
      )}
    </motion.button>
  )
}
