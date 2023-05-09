import { Server } from "miragejs";

export const exampleProfiles = [
  { name: "Raoul Duke", bio: "A man who procrastinates in his choosing will inevitably have his choice made for him by circumstance.", icon: "School" },
  { name: "Hunter S. Thompson", bio: "I hate to advocate drugs, alcohol, violence, or insanity to anyone, but they've always worked for me.", icon: "School" },
  { name: "Dr. Gonzo", bio: "There he goes. One of God's own prototypes. A high-powered mutant of some kind never even considered for mass production. Too weird to live, and too rare to die.", icon: "School" },
]


export default function mockProfiles(server: Server) {
  server.get("students/:studentId/profile", async (schema: any, { queryParams }) => {
    schema.findBy("students", { id: queryParams.studentId }).profile
  })

  server.put("students/:studentId/profile", async (schema, request) => {
    const { newName, newBio, newIcon } = JSON.parse(request.requestBody);

    return {
      name: newName ?? "Raoul Duke",
      bio: newBio ?? "A man who procrastinates in his choosing will inevitably have his choice made for him by circumstance.",
      icon: newIcon ?? "School"
    }
  })
}