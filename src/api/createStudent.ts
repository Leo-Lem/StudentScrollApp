interface StudentInfo {
    name: string
    email: string
    password: string
  }
  export default async function createStudent(
    name:   string,
    email: string,
    password: string,
  ): Promise<void> {
    try {
      const student: StudentInfo = { name, email, password}
  
      const response = await fetch("api/v1/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student)
      })
  
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  