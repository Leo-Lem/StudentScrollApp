export module AuthenticationAPI {
  export interface SignupInfo {
    name: string
    email: string
    password: string
  }

  export async function signup(info: SignupInfo): Promise<void> {
    const response = await fetch("api/v1/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(info)
    })

    if (response.ok) {
      const body = await response.json()
      setSignedIn(body.token, body.id)
    } else if (response.status === 409) {
      throw Error("Email taken")
    }
  }

  export interface SigninInfo {
    email: string
    password: string
  }

  export async function signin(info: SigninInfo): Promise<void> {
    const response = await fetch("api/v1/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(info)
    })

    if (response.ok) {
      const body = await response.json()
      setSignedIn(body.token, body.id)
    } else if (response.status === 401) {
      throw Error("Invalid email or password")
    }
  }

  export function signout(): void {
    localStorage.removeItem("jwt")
    localStorage.removeItem("id")
    window.location.href = ""
  }

  function setSignedIn(token: string, id: number): void {
    localStorage.setItem("jwt", token)
    localStorage.setItem("id", JSON.stringify(id))
    window.location.href = ""
  }
}