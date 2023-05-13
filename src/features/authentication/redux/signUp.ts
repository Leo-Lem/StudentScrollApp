import { createAsyncThunk } from "@reduxjs/toolkit"

import AuthenticationError from "../types/AuthenticationError"

export default createAsyncThunk(
  "auth/signUp",
  async (info: { name: string; email: string; password: string }) => {
    const response = await fetch("/api/v1/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info)
    })

    if (response.ok) {
      const json: { id: number; token: string } = await response.json()
      return { studentId: json.id, token: json.token }
    }

    switch (response.status) {
      case 401:
        return { error: AuthenticationError.emailInUse }
      default:
        return { error: AuthenticationError.unknown }
    }
  }
)
