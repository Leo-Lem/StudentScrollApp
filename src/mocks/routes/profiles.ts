import { Response, Server } from "miragejs"
import StudentLocation from "../../features/nearby/types/StudentLocation"

export default function mock(server: Server) {
  server.get("students/:studentId", async (schema: any, { url }) => {
    return respond(schema.profiles.findBy({ id: parseInt(url.split("/")[4]) })?.attrs)
  })

  server.get("students", async (schema: any, { queryParams }) => {
    const name = queryParams.name
    const interests = queryParams.interests
    const lat = parseFloat(queryParams.lat)
    const lng = parseFloat(queryParams.lng)

    if (name) return schema.profiles.where((p: any) => p.name.includes(name)).models.map(respond)
    else if (interests)
      return schema.profiles
        .where((profile: any) => profile.interests.includes(interests))
        .models.map(respond)
    else if (!isNaN(lat) && !isNaN(lng)) return schema.profiles.all().models.map(respond)
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

  server.post("students/:studentId/followers", (schema) => {
    return new Response(201)
  })

  server.delete("students/:studentId/followers", (schema, { url }) => {
    return new Response(204)
  })
}

interface ProfileResponse {
  studentId: number
  name: string
  bio: string
  icon: string
  interests: string[]
  location: StudentLocation
  followers: number[]
  follows: number[]
}

function respond(profile: any | undefined): ProfileResponse | undefined {
  if (profile === undefined) return undefined
  else
    return {
      studentId: parseInt(profile.studentId),
      name: profile.name,
      bio: profile.bio,
      icon: profile.icon,
      interests: profile.interests,
      location: profile.location,
      followers: profile.followers.map((follower: any) => parseInt(follower)),
      follows: profile.follows.map((follow: any) => parseInt(follow))
    }
}
