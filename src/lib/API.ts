import { tryGettingAuthzHeader } from "./redux"
import Result from "./Result"

export type APIResult<T> = Result<T, APIError>

export interface APIError {
  code: number
  message: string
}

namespace API {
  export async function call<Body, Success>(
    thunkAPI: any,
    method: "get" | "post" | "put" | "delete",
    url: string,
    requiresAuthorization = true,
    body?: Body
  ): Promise<APIResult<Success>> {
    const fullUrl = `/api/v2/${url}`

    try {
      const response = await fetch(fullUrl, {
        method: method.toUpperCase(),
        headers: {
          ...(requiresAuthorization ? { Authorization: tryGettingAuthzHeader(thunkAPI) } : {}),
          ...(body !== undefined ? { "Content-Type": "application/json" } : {})
        },
        ...(body !== undefined && { body: JSON.stringify(body) })
      })

      if (response.ok)
        return {
          ok: true,
          value: (response.status === 204 ? undefined : await response.json()) as Success
        }
      else
        return {
          ok: false,
          error: {
            code: response.status,
            message: `Failed to ${method} '${fullUrl}': (${response.status}) ${response.statusText}`
          }
        }
    } catch (error: any) {
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
  ): Promise<APIResult<Success>> {
    return call(thunkAPI, "get", url, requiresAuthorization)
  }

  export async function post<Body, Success>(
    thunkAPI: any,
    url: string,
    body: Body,
    requiresAuthorization = true
  ): Promise<APIResult<Success>> {
    return call(thunkAPI, "post", url, requiresAuthorization, body)
  }

  export async function put<Body, Success>(
    thunkAPI: any,
    url: string,
    body: Body,
    requiresAuthorization = true
  ): Promise<APIResult<Success>> {
    return call(thunkAPI, "put", url, requiresAuthorization, body)
  }

  export async function del(
    thunkAPI: any,
    url: string,
    requiresAuthorization = true
  ): Promise<APIResult<undefined>> {
    return call(thunkAPI, "delete", url, requiresAuthorization)
  }
}

export default API
