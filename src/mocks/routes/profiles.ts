import { Server } from "miragejs"
import StudentLocation from "../../features/nearby/types/StudentLocation"

export default function mock(server: Server) {
  server.get("students/:studentId", async (schema: any, { url }) => {
    return respond(schema.profiles.findBy({ id: parseInt(url.split("/")[4]) })?.attrs)
  })

  server.get("students", async (schema: any, { queryParams }) => {
    const lat = parseFloat(queryParams.lat)
    const lng = parseFloat(queryParams.lng)

    if (!isNaN(lat) && !isNaN(lng)) return schema.profiles.all().models.map(respond)
  })

  server.put("students", async (schema: any, { requestBody }) => {
    const profile = schema.profiles.first()
    const { newName, newBio, newIcon, newInterests, newLocation } = JSON.parse(requestBody)

    profile.update({
      name: newName ?? profile.name,
      bio: newBio ?? profile.bio,
      icon: newIcon ?? profile.icon,
      interests: newInterests ?? profile.interests,
      location: newLocation ?? profile.location
    })

    return respond(profile.attrs)
  })
}

interface Response {
  studentId: number
  name: string
  bio: string
  icon: string
  interests: string[]
  location: StudentLocation
  followers: number[]
  follows: number[]
}

function respond(profile: any): Response {
  return {
    studentId: parseInt(profile.studentId),
    name: profile.name,
    bio: profile.bio,
    icon: profile.icon,
    interests: profile.interests,
    location: profile.location,
    followers: profile.followers.map((follower: any) => parseInt(follower.studentId)),
    follows: profile.follows.map((follow: any) => parseInt(follow.studentId))
  }
}
