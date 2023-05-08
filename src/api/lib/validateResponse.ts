export default async function validateResponse<T>(response: Response): Promise<T> {
  if (response.ok) return (await response.json()) as T
  else console.log(response)

  throw Error("Something went wrong…")
}
