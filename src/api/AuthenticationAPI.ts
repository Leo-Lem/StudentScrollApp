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

    if (response.ok) setSignedIn(await response.json())
    else if (response.status === 409) throw Error("Email taken")
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

    if (response.ok) setSignedIn(await response.json())
    else if (response.status === 401) throw Error("Invalid credentials")
    else console.log(response)
  }

  export function signout(): void {
    localStorage.removeItem("jwt")
    localStorage.removeItem("id")
    window.location.href = ""
  }
}

function setSignedIn(json: { token: string, id: number }): void {
  localStorage.setItem("jwt", JSON.stringify(json.token))
  localStorage.setItem("id", JSON.stringify(json.id))
  window.location.href = ""
}
