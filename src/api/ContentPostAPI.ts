import type ContentPost from "../models/ContentPost"
import authorizationHeader from "./lib/authorizationHeader"
import studentId from "./lib/studentId"
import validateResponse from "./lib/validateResponse"

export module ContentPostAPI {
  export interface CreationInfo {
    title: string
    tags: string[]
    content: string
  }

  export async function create(info: CreationInfo): Promise<void> {
    const response = await fetch("/api/v1/posts", {
      method: "POST",
      headers: {
        Authorization: authorizationHeader(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...info, posterId: studentId() })
    })

    if (response.ok) window.location.href = ""
    await validateResponse(response)
  }

  export async function read(page: number, newestFirst: boolean): Promise<ContentPost[]> {
    const response = await fetch(
      `/api/v1/posts?page=${page}&size=10&sort=timestamp&sortAscending=${JSON.stringify(
        !newestFirst
      )}`,
      {
        method: "GET",
        headers: { Authorization: authorizationHeader() }
      }
    )

    return await validateResponse(response)
  }

  export async function deleteWith(postId: number): Promise<void> {
    const response = await fetch(`/api/v1/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: authorizationHeader(),
        "Content-Type": "application/json"
      }
    })

    if (response.ok) window.location.href = ""
    await validateResponse(response)
  }
}
