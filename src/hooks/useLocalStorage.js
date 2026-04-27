import { useState, useEffect, useCallback } from 'react'

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item === null) return initialValue
      return JSON.parse(item)
    } catch (e) {
      console.warn(`useLocalStorage: error reading "${key}"`, e)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.warn(`useLocalStorage: error writing "${key}"`, e)
    }
  }, [key, value])

  const reset = useCallback(() => setValue(initialValue), [initialValue])

  return [value, setValue, reset]
}
