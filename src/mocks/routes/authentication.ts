import { Response, Server } from "miragejs"

export default function mock(server: Server) {
  server.post("account", (schema: any, { requestBody }) => {
    const { name, email } = JSON.parse(requestBody)

    if (name === undefined) {
      const student = schema.students.findBy({ email: email })

      if (student !== null) return respond(student)
      else return new Response(401, {})
    } else {
      if (schema.students.findBy({ email: email }) === null)
        return respond(schema.students.create({ name: name, email: email }))
      else return new Response(409, {})
    }
  })
}

interface StudentResponse {
  id: number
  email: string
  token: string
  type: "Bearer"
}

function respond(student: any): StudentResponse {
  return { ...student.attrs, id: parseInt(student.id), token: "xyz123", type: "Bearer" }
}
