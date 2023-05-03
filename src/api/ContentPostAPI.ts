import type ContentPost from "../models/ContentPost"
import { AuthenticationAPI } from "./AuthenticationAPI"
import authorizationHeader from "./lib/authorizationHeader"
import studentId from "./lib/studentId"

export module ContentPostAPI {
  export interface CreationInfo {
    title: string
    tags: string[]
    content: string
  }

  export async function create(info: CreationInfo): Promise<void> {
    const response = await fetch("api/v1/posts", {
      method: "POST",
      headers: {
        Authorization: authorizationHeader(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...info, posterId: studentId() })
    })

    if (response.ok) window.location.href = ""
    else if (response.status === 403) AuthenticationAPI.signout()
    else console.log(response)
  }

  export async function read(page: number, newestFirst: boolean): Promise<ContentPost[]> {
    const response = await fetch(
      `api/v1/posts?page=${page}&size=10&sort=timestamp&sortAscending=${JSON.stringify(
        !newestFirst
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: authorizationHeader(),
          "Content-Type": "application/json"
        }
      }
    )

    if (response.ok) return (await response.json()) as ContentPost[]
    else if (response.status === 403) AuthenticationAPI.signout()
    else console.log(response)

    throw Error("Something went wrong…")
  }

  export async function deleteWith(postId: number): Promise<void> {
    const response = await fetch(`api/v1/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: authorizationHeader(),
        "Content-Type": "application/json"
      }
    })

    if (response.ok) window.location.href = ""
    else if (response.status === 403) AuthenticationAPI.signout()
    else console.log(response)
  }
}
