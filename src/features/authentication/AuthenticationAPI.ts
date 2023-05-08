export module AuthenticationAPI {
  export interface AuthenticationResponse {
    studentId: number
    token: string
  }

  export interface SignupRequest {
    name: string
    email: string
    password: string
  }

  export async function signup(info: SignupRequest): Promise<AuthenticationResponse> {
    const response = await fetch("/api/v1/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(info)
    })

    if (response.ok) return setSignedIn(await response.json())
    else if (response.status === 409) throw Error("Email taken")
    else throw Error("Unexpected response")
  }

  export interface SignInInfo {
    email: string
    password: string
  }

  export async function signin(info: SignInInfo): Promise<AuthenticationResponse> {
    const response = await fetch("/api/v1/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info)
    })

    if (response.ok) return setSignedIn(await response.json())
    else if (response.status === 401) throw Error("Invalid credentials")
    else throw Error("Unexpected response")
  }

  export function signout(): void {
    localStorage.removeItem("jwt")
    localStorage.removeItem("id")
    window.location.href = ""
  }

  const setSignedIn = (json: { token: string; id: number }): AuthenticationResponse => ({
    token: json.token,
    studentId: json.id
  })
}
