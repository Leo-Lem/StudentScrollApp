export default function authorizationHeader(): string {
  const token = localStorage.getItem("jwt")

  if (token == null) throw Error("Not authenticated")
  else return `Bearer ${JSON.parse(token) as string}`
}
