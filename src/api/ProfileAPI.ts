import type Profile from "../models/Profile"
import authorizationHeader from "./lib/authorizationHeader"
import studentId from "./lib/studentId"
import validateResponse from "./lib/validateResponse"

export module ProfileAPI {
  export async function read(id?: number): Promise<Profile> {
    const response = await fetch(`/api/v1/students/${id ?? studentId()}/profile`, {
      method: "GET",
      headers: {
        Authorization: authorizationHeader()
      }
    })

    return await validateResponse(response)
  }

  export interface UpdateProfileRequest {
    newName?: string
    newBio?: string
    newIcon?: string
  }

  export async function update(request: UpdateProfileRequest): Promise<Profile> {
    const response = await fetch(`/api/v1/students/${studentId()}/profile`, {
      method: "PUT",
      headers: {
        Authorization: authorizationHeader(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    })

    return await validateResponse(response)
  }
}
