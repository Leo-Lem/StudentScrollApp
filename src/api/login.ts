interface LoginDetails {
    email: string
    password: string
  }
  
  export default async function login(
    email: string,
    password: string
  ): Promise<void> {
    try {
      const login: LoginDetails = { email, password }
  
      const response = await fetch("api/v1/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login)
      })
  
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  