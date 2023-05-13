import { Server } from "miragejs";

export const exampleSettings = {
  "theme": "dark",
  "locale": "en",
  "isLocated": true
}

export default function mockSettings(server: Server) {
  server.get("students/:studentId/settings", async (schema: any) => {
    return JSON.stringify(schema.settings.first().attrs)
  })

  server.put("students/:studentId/settings", async (schema: any, { requestBody }) => {
    const settings = schema.settings.first()
    const { newTheme, newLocale, newIsLocated } = JSON.parse(requestBody)

    settings.update({
      theme: newTheme ?? settings.theme,
      locale: newLocale ?? settings.locale,
      isLocated: newIsLocated ?? settings.isLocated
    })

    return JSON.stringify(settings.attrs)
  })
}