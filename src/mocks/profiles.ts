import { Server } from "miragejs"

export const exampleProfiles = [
  {
    name: "Raoul Duke",
    bio: "A man who procrastinates in his choosing will inevitably have his choice made for him by circumstance.",
    icon: "School",
    studentsId: "1"
  },
  {
    name: "Hunter S. Thompson",
    bio: "I hate to advocate drugs, alcohol, violence, or insanity to anyone, but they've always worked for me.",
    icon: "School",
    studentsId: "2"
  },
  {
    name: "Dr. Gonzo",
    bio: "There he goes. One of God's own prototypes. A high-powered mutant of some kind never even considered for mass production. Too weird to live, and too rare to die.",
    icon: "School",
    studentsId: "3"
  }
]

export default function mockProfiles(server: Server) {
  server.get("students/:studentId/profile", async (schema: any, { url }) => {
    return JSON.stringify(schema.profiles.findBy({ studentsId: parseInt(url.split("/")[4]) }).attrs)
  })

  server.put("students/:studentId/profile", async (schema: any, { url, requestBody }) => {
    const profile = schema.profiles.findBy({ studentsId: parseInt(url.split("/")[4]) })
    const { newName, newBio, newIcon } = JSON.parse(requestBody)

    profile.update({
      name: newName ?? profile.name,
      bio: newBio ?? profile.bio,
      icon: newIcon ?? profile.icon
    })
    return JSON.stringify(profile.attrs)
  })
}
