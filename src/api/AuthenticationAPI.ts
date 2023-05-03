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
      const { token, id } = await response.json()
      setSignedIn(token, id)
    } else if (response.status === 409) {
      throw Error("Email taken")
    }
  }

  export interface SignInInfo {
    email: string
    password: string
  }

  export async function signin(info: SignInInfo): Promise<void> {
    const response = await fetch("api/v1/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(info)
    })

    if (response.ok) {
      const { token, id } = await response.json()
      setSignedIn(token, id)
    } else if (response.status === 401) {
      throw Error("Invalid credentials")
    }
  }

  export function signout(): void {
    localStorage.removeItem("jwt")
    localStorage.removeItem("id")
    window.location.href = ""
  }
}

function setSignedIn(token: string, id: number): void {
  localStorage.setItem("jwt", JSON.stringify(token))
  localStorage.setItem("id", JSON.stringify(id))
  window.location.href = ""
}
