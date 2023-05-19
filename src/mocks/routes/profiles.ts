import { Server } from "miragejs"

export default function mock(server: Server) {
  server.get("students/:studentId/profile", async (schema: any, { url }) => {
    return JSON.stringify(schema.profiles.findBy({ id: parseInt(url.split("/")[4]) })?.attrs)
  })

  server.get("/students", async (schema: any, { queryParams }) => {
    const lat = parseFloat(queryParams.lat)
    const lng = parseFloat(queryParams.lng)

    if (!isNaN(lat) && !isNaN(lng)) return [1, 2, 3, 4, 5, 6, 7, 8, 9]
  })

  server.put("students/:studentId/profile", async (schema: any, { url, requestBody }) => {
    const profile = schema.profiles.findBy({ id: parseInt(url.split("/")[4]) })
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
