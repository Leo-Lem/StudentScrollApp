import { Server } from "miragejs";

export const exampleStudents = [
  { id: "1", name: "Raoul Duke", email: "raoul@duke.legend" },
  { id: "2", name: "Hunter S. Thompson", email: "hunter@stockton.thompson" },
  { id: "3", name: "Dr. Gonzo", email: "dr@gonzo.legend" }
]

export default function mockAuthentication(server: Server) {
  server.post("signin", (schema, request) => {
    const { email } = JSON.parse(request.requestBody)

    return {
      id: 1,
      name: "Raoul Duke",
      email: email,
      token: "xyz123",
      type: "Bearer"
    }
  })

  server.post("students", (schema, request) => {
    const { name, email } = JSON.parse(request.requestBody)

    return {
      id: 1,
      name: name,
      email: email,
      token: "xyz123",
      type: "Bearer"
    }
  })
}