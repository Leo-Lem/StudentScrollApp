import { Server } from "miragejs"

export const exampleProfiles = [
  {
    name: "Raoul Duke",
    bio: "A man who procrastinates in his choosing will inevitably have his choice made for him by circumstance.",
    icon: "diversity",
    studentsId: "1"
  },
  {
    name: "Hunter S. Thompson",
    bio: "I hate to advocate drugs, alcohol, violence, or insanity to anyone, but they've always worked for me.",
    icon: "graduation",
    studentsId: "2"
  },
  {
    name: "Dr. Gonzo",
    bio: "There he goes. One of God's own prototypes. A high-powered mutant of some kind never even considered for mass production. Too weird to live, and too rare to die.",
    icon: "music",
    studentsId: "3"
  },
  {
    name: "Oscar Zeta Acosta",
    bio: "I was a heavy smoker, a habitual drinker, and a recreational drug user, and I'd just barely survived a bout with Dr. Gonzo in the Mojave Desert.",
    icon: "camera",
    studentsId: "4"
  },
  {
    name: "Lucy",
    bio: "I love you, Raoul Duke. And I want to have your abortion.",
    icon: "paintbrush",
    studentsId: "5"
  },
  {
    name: "L. Ron Bumquist",
    bio: "I hate to say this, but this place is getting to me. I think I'm getting the Fear.",
    icon: "globe",
    studentsId: "6"
  },
  {
    name: "Dr. Loomis",
    bio: "I have a theory that the truth is never told during the nine-to-five hours.",
    icon: "book",
    studentsId: "7"
  },
  {
    name: "Sandy",
    bio: "I hope you were the anti-Christ, so I can keep on hating you.",
    icon: "star",
    studentsId: "8"
  },
  {
    name: "The Hitchhiker",
    bio: "I'm going to eat your brains and gain your knowledge.",
    icon: "backpack",
    studentsId: "9"
  }
]

export default function mockProfiles(server: Server) {
  server.get("students/:studentId/profile", async (schema: any, { url }) => {
    return JSON.stringify(schema.profiles.findBy({ studentsId: parseInt(url.split("/")[4]) }).attrs)
  })

  server.get("/students/:studentId", async (schema: any, request) => {
    return schema.profiles.findBy({ id: request.params.studentId })
  })

  server.get("/students/:studentName", async (schema: any, request) => {
    return schema.profiles.where({ name: request.params.studentName })
  })

  server.get("/students", async (schema: any) => {
    return schema.profiles.all()
  })

  server.get("/profile/:studentId", async (schema: any, request) => {
    return schema.profiles.findBy({ id: request.params.studentId })
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
