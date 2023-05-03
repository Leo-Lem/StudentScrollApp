import useLocalStorage from "./useLocalStorage"

export default function useId(): [number | null, (newId: number | null) => void] {
  return useLocalStorage<number | null>("id", null)
}
