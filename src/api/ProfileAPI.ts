import type Profile from "../models/Profile"

// decalaring a module
export module ProfileAPI {
  const id = 1 // TODO: actually use student id

  export async function read(): Promise<Profile> {
    const response = await fetch(`api/v1/students/${id}/profile`)

    if (response.ok) return (await response.json()) as Profile
    else throw Error("Unexpected response")
  }

  export interface UpdateProfileRequest {
    newName?: string
    newBio?: string
    newIcon?: string
  }

  export async function update(request: UpdateProfileRequest): Promise<Profile> {
    const response = await fetch(`api/v1/students/${id}/profile`, {
      method: "PUT",
      headers: {
        // TODO: add authorization
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    })

    if (response.ok) return (await response.json()) as Profile
    else throw Error("Unexpected response")
  }
}
