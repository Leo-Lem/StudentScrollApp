import type Profile from "./types/Profile"

export namespace ProfileAPI {
  export async function read(id?: number): Promise<Profile> {
    throw Error("Not implemented")
  }

  export interface UpdateProfileRequest {
    newName?: string
    newBio?: string
    newIcon?: string
  }

  export async function update(request: UpdateProfileRequest): Promise<Profile> {
    throw Error("Not implemented")
  }
}
