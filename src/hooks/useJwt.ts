import useLocalStorage from "./useLocalStorage"

export default function useJwt(): [string | null, (newToken: string | null) => void] {
  return useLocalStorage<string | null>("jwt", null)
}
