import { tryGettingAuthorizationHeader } from "../redux"
import Result from "./Result"

namespace API {
  export interface Error {
    code: number
    message: string
  }

  export async function call<Body, Success>(
    thunkAPI: any,
    method: "get" | "post" | "put" | "delete",
    url: string,
    requiresAuthorization = true,
    body?: Body
  ): Promise<Result<Success, Error>> {
    const fullUrl = `/api/v1/${url}`

    try {
      const response = await fetch(fullUrl, {
        method: method.toUpperCase(),
        headers: {
          ...(requiresAuthorization
            ? { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
            : {}),
          ...(body !== undefined ? { "Content-Type": "application/json" } : {})
        },
        ...(body !== undefined && { body: JSON.stringify(body) })
      })

      if (response.ok) return { ok: true, value: (await response.json()) as Success }
      else
        return {
          ok: false,
          error: {
            code: response.status,
            message: `Failed to ${method} '${fullUrl}': (${response.status}) ${response.statusText}`
          }
        }
    } catch (error: any) {
      if (
        error.message.contains("The string did not match the expected pattern") &&
        process.env.NODE_ENV === "development"
      )
        return {
          ok: false,
          error: {
            code: 666,
            message:
              "MirageJS is not running. Please navigate to another page and back to start it up."
          }
        }
      else
        return {
          ok: false,
          error: {
            code: 666,
            message: `Failed to ${method} '${fullUrl}': (Error) ${error}`
          }
        }
    }
  }

  export async function get<Success>(
    thunkAPI: any,
    url: string,
    requiresAuthorization = true
  ): Promise<Result<Success, Error>> {
    return call(thunkAPI, "get", url, requiresAuthorization)
  }

  export async function post<Body, Success>(
    thunkAPI: any,
    url: string,
    body: Body,
    requiresAuthorization = true
  ): Promise<Result<Success, Error>> {
    return call(thunkAPI, "post", url, requiresAuthorization, body)
  }

  export async function put<Body, Success>(
    thunkAPI: any,
    url: string,
    body: Body,
    requiresAuthorization = true
  ): Promise<Result<Success, Error>> {
    return call(thunkAPI, "put", url, requiresAuthorization, body)
  }

  export async function del(
    thunkAPI: any,
    url: string,
    requiresAuthorization = true
  ): Promise<Result<void, Error>> {
    return call(thunkAPI, "delete", url, requiresAuthorization)
  }
}

export default API
