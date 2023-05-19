import { useParams } from "react-router-dom"

export default function useIdParam(placeholder: string): number | undefined {
  const raw = useParams()[placeholder]
  return raw !== undefined ? parseInt(raw) : undefined
}
