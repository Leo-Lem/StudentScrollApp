import useLocalStorage from "./useLocalStorage"

export default function useStudentId(): [number | null, (newId: number | null) => void] {
  return useLocalStorage<number | null>("id", null)
}
