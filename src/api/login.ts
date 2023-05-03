interface LoginDetails {
  email: string
  password: string
}

export default async function login(email: string, password: string): Promise<void> {
  const login: LoginDetails = { email, password }

  const response = await fetch("api/v1/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(login)
  })

  if (response.status === 401) throw new Error("Credentials are not accepted")
}
