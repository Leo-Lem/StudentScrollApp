import useLocalStorage from "./useLocalStorage"

export default function useId(): [number | null, (newValue: number | null) => void] {
  const [id, setId] = useLocalStorage<number | null>("id", null)
  return [id, setId]
}
