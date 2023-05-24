import { useParams } from "react-router-dom"

export default function useIdParam(placeholder: string): number | undefined {
  const raw = useParams()[placeholder]
  if (raw === undefined || isNaN(parseInt(raw))) return undefined
  else return parseInt(raw)
}
