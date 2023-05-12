import { Response, Server } from "miragejs"

export const exampleStudents = [
  { id: "1", name: "Raoul Duke", email: "raoul@duke.legend" },
  { id: "2", name: "Hunter S. Thompson", email: "hunter@stockton.thompson" },
  { id: "3", name: "Dr. Gonzo", email: "dr@gonzo.legend" }
]

export default function mockAuthentication(server: Server) {
  server.post("signin", (schema: any, { requestBody }) => {
    const { email } = JSON.parse(requestBody)

    const student = schema.students.findBy({ email: email })

    if (student !== null)
      return { ...student.attrs, id: parseInt(student.id), token: "xyz123", type: "Bearer" }
    else return new Response(401, {})
  })

  server.post("students", (schema: any, { requestBody }) => {
    const { name, email } = JSON.parse(requestBody)

    const student = schema.students.findBy({ email: email })

    if (student === null) {
      const newStudent = schema.students.create({ name: name, email: email })
      return { ...newStudent.attr, id: parseInt(newStudent.id), token: "xyz123", type: "Bearer" }
    } else return new Response(409, {})
  })
}
