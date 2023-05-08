import { AuthenticationAPI } from "../../features/authentication/AuthenticationAPI"

export default async function validateResponse<T>(response: Response): Promise<T> {
  if (response.ok) return (await response.json()) as T
  else if (response.status === 403) AuthenticationAPI.signout()
  else console.log(response)

  throw Error("Something went wrong…")
}
