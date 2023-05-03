import type ContentPost from "../models/ContentPost"
import authorizationHeader from "./lib/authorizationHeader"
import studentId from "./lib/studentId"

export module ContentPostAPI {
  export interface CreationInfo {
    title: string
    tags: string[]
    content: string
  }

  export async function create(info: CreationInfo): Promise<void> {
    await fetch("api/v1/posts", {
      method: "POST",
      headers: {
        Authorization: authorizationHeader(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...info, posterId: studentId() })
    })
  }

  export async function read(page: number): Promise<ContentPost[]> {
    const response = await fetch("api/v1/posts", {
      method: "GET",
      headers: {
        Authorization: authorizationHeader(),
        "Content-Type": "application/json"
      }
    })

    return (await response.json()) as ContentPost[]
  }
}