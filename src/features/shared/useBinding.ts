import { useState } from "react";

export interface Binding<T> {
  get: T
  set: (value: T) => void
}

export default function useBinding<T>(initialValue: T): Binding<T> {
  const [get, set] = useState(initialValue)
  return { get, set }
}