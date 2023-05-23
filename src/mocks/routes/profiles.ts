import { Server } from "miragejs"

export default function mock(server: Server) {
  server.get("students/:studentId", async (schema: any, { url }) => {
    return JSON.stringify(schema.profiles.findBy({ id: parseInt(url.split("/")[4]) })?.attrs)
  })

  server.get("students", async (schema: any, { queryParams }) => {
    const lat = parseFloat(queryParams.lat)
    const lng = parseFloat(queryParams.lng)

    if (!isNaN(lat) && !isNaN(lng)) return schema.profiles.all().models
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

    return JSON.stringify(profile.attrs)
  })
}
