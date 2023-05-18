import { Server } from "miragejs"

export const exampleProfiles = [
  {
    name: "Raoul Duke",
    bio: "A man who procrastinates in his choosing will inevitably have his choice made for him by circumstance.",
    icon: "diversity",
    interests: ["Travel", "Music", "AUT"],
    location: { lat: -36.85489, lng: 174.7669 },
    studentsId: "1"
  },
  {
    name: "Hunter S. Thompson",
    bio: "I hate to advocate drugs, alcohol, violence, or insanity to anyone, but they've always worked for me.",
    icon: "graduation",
    interests: ["Writing", "Journalism", "Politics"],
    location: { lat: -36.85, lng: 174.75 },
    studentsId: "2"
  },
  {
    name: "Dr. Gonzo",
    bio: "There he goes. One of God's own prototypes. A high-powered mutant of some kind never even considered for mass production. Too weird to live, and too rare to die.",
    icon: "music",
    interests: ["Drugs", "Alcohol", "Guns"],
    location: { lat: -36.845, lng: 174.76 },
    studentsId: "3"
  },
  {
    name: "Oscar Zeta Acosta",
    bio: "I was a heavy smoker, a habitual drinker, and a recreational drug user, and I'd just barely survived a bout with Dr. Gonzo in the Mojave Desert.",
    icon: "camera",
    interests: ["Law", "Politics", "Activism"],
    location: { lat: -36.8549, lng: 174.7668 },
    studentsId: "4"
  },
  {
    name: "Lucy",
    bio: "I love you, Raoul Duke. And I want to have your abortion.",
    icon: "paintbrush",
    interests: ["Art", "Music", "Drugs"],
    location: { lat: -36.865, lng: 174.755 },
    studentsId: "5"
  },
  {
    name: "L. Ron Bumquist",
    bio: "I hate to say this, but this place is getting to me. I think I'm getting the Fear.",
    icon: "globe",
    interests: ["Writing", "Journalism", "Politics"],
    location: { lat: -36.845, lng: 174.78 },
    studentsId: "6"
  },
  {
    name: "Dr. Loomis",
    bio: "I have a theory that the truth is never told during the nine-to-five hours.",
    icon: "book",
    interests: ["Writing", "Journalism", "Politics"],
    location: { lat: -36.86, lng: 174.79 },
    studentsId: "7"
  },
  {
    name: "Sandy",
    bio: "I hope you were the anti-Christ, so I can keep on hating you.",
    icon: "star",
    interests: ["Writing", "Journalism", "Politics"],
    location: { lat: -36.855, lng: 174.8 },
    studentsId: "8"
  },
  {
    name: "The Hitchhiker",
    bio: "I'm going to eat your brains and gain your knowledge.",
    icon: "backpack",
    interests: ["Writing", "Journalism", "Politics"],
    location: { lat: -36.87, lng: 174.78 },
    studentsId: "9"
  }
]

export default function mockProfiles(server: Server) {
  server.get("students/:studentId/profile", async (schema: any, { url }) => {
    return JSON.stringify(
      schema.profiles.findBy({ studentsId: parseInt(url.split("/")[4]) })?.attrs
    )
  })

  server.get("/students", async (schema: any, { queryParams }) => {
    const lat = parseFloat(queryParams.lat)
    const lng = parseFloat(queryParams.lng)

    if (!isNaN(lat) && !isNaN(lng)) return [1, 2, 3, 4, 5, 6, 7, 8, 9]
  })

  server.put("students/:studentId/profile", async (schema: any, { url, requestBody }) => {
    const profile = schema.profiles.findBy({ studentsId: parseInt(url.split("/")[4]) })
    const { newName, newBio, newIcon, newInterests, newLocation } = JSON.parse(requestBody)

    profile.update({
      name: newName ?? profile.name,
      bio: newBio ?? profile.bio,
      icon: newIcon ?? profile.icon,
      interests: newInterests ?? profile.interests,
      location: newLocation ?? profile.location
    })
    return JSON.stringify(profile.attrs)
  })
}
