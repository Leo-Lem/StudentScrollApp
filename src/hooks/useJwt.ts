import useLocalStorage from "./useLocalStorage"

const key = "jwt"

export function getJwt(): string | null {
  const token = localStorage.getItem(key)
  if (token !== null) return JSON.parse(token)
  else return null
}

export function setJwt(token: string | null): void {
  localStorage.setItem(key, JSON.stringify(token))
}

export default function useJwt(): [string | null, (newToken: string | null) => void] {
  const [jwt, setJwt] = useLocalStorage<string | null>(key, null)
  return [jwt, setJwt]
}
