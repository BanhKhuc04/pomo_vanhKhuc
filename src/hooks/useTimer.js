import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * useTimer - countdown timer hook
 * @param {number} initialSeconds
 * @param {function} onComplete - called when timer reaches 0
 * @param {function} onTick - optional, called each second with remaining seconds
 */
export default function useTimer(initialSeconds, onComplete, onTick) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)
  const onCompleteRef = useRef(onComplete)
  const onTickRef = useRef(onTick)

  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])
  useEffect(() => { onTickRef.current = onTick }, [onTick])

  // Reset when initialSeconds changes (e.g., mode switch)
  useEffect(() => {
    setSecondsLeft(initialSeconds)
    setIsRunning(false)
  }, [initialSeconds])

  useEffect(() => {
    if (!isRunning) return
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          setIsRunning(false)
          if (onCompleteRef.current) {
            // Defer to avoid setState during render
            setTimeout(() => onCompleteRef.current(), 0)
          }
          return 0
        }
        const next = prev - 1
        if (onTickRef.current) onTickRef.current(next)
        return next
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [isRunning])

  const start = useCallback(() => {
    if (secondsLeft > 0) setIsRunning(true)
  }, [secondsLeft])

  const pause = useCallback(() => setIsRunning(false), [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setSecondsLeft(initialSeconds)
  }, [initialSeconds])

  const toggle = useCallback(() => {
    setIsRunning(r => {
      if (r) return false
      if (secondsLeft <= 0) return false
      return true
    })
  }, [secondsLeft])

  const setSeconds = useCallback((s) => {
    setSecondsLeft(s)
  }, [])

  return { secondsLeft, isRunning, start, pause, reset, toggle, setSeconds }
}
