import useLocalStorage from "./useLocalStorage"

export default function useJwt(): [string | null, (newToken: string | null) => void] {
  const [jwt, setJwt] = useLocalStorage<string | null>("jwt", null)
  return [jwt, setJwt]
}
