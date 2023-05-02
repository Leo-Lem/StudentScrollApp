import { useEffect, useState } from "react"

export default function useLocalStorage<T>(key: string, defaultValue: T): [T, (newValue: T) => void] {
  const [value, _setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) return JSON.parse(raw);
    } catch { }

    return defaultValue
  })

  const setValue = (value: T): void => {
    try {
      _setValue(value)
      const raw = JSON.stringify(value);
      localStorage.setItem(key, raw)
    } catch (error) { }
  }

  useEffect(() => {
    const raw = localStorage.getItem(key)
    if (raw !== null)
      _setValue(JSON.parse(raw))
  }, [localStorage.getItem(key)])

  return [value, setValue]
}
