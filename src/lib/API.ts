import { tryGettingAuthorizationHeader } from "../redux"
import Result from "./Result"

module API {
  export interface Error {
    code: number
    message: string
  }

  export async function get<Success>(thunkAPI: any, url: string): Promise<Result<Success, Error>> {
    return call(thunkAPI, "get", url)
  }

  export async function post<Body, Success>(
    thunkAPI: any,
    url: string,
    body: Body
  ): Promise<Result<Success, Error>> {
    return call(thunkAPI, "post", url, body)
  }

  export async function put<Body, Success>(
    thunkAPI: any,
    url: string,
    body: Body
  ): Promise<Result<Success, Error>> {
    return call(thunkAPI, "put", url, body)
  }

  export async function del(thunkAPI: any, url: string): Promise<Result<void, Error>> {
    return call(thunkAPI, "delete", url)
  }

  export async function call<Body, Success>(
    thunkAPI: any,
    method: "get" | "post" | "put" | "delete",
    url: string,
    body?: Body
  ): Promise<Result<Success, Error>> {
    const response = await fetch(`/api/v1/${url}`, {
      method: method.toUpperCase(),
      headers: {
        Authorization: tryGettingAuthorizationHeader(thunkAPI),
        ...(body !== undefined ? { "Content-Type": "application/json" } : {})
      },
      body: body !== undefined ? JSON.stringify(body) : undefined
    })

    if (response.ok) return { ok: true, value: (await response.json()) as Success }
    else
      return {
        ok: false,
        error: {
          code: response.status,
          message: `Failed to ${method} '${url}': (${response.status}) ${response.statusText}`
        }
      }
  }

}

export default API
