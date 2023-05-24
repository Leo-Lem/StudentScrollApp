import { Server } from "miragejs"

export default function mock(server: Server) {
  server.get("account/settings", async (schema: any) => {
    return JSON.stringify(schema.settings.first().attrs)
  })

  server.put("account/settings", async (schema: any, { requestBody }) => {
    const settings = schema.settings.first()
    const { newTheme, newLocale } = JSON.parse(requestBody)

    settings.update({
      theme: newTheme ?? settings.theme,
      locale: newLocale ?? settings.locale
    })

    return JSON.stringify(settings.attrs)
  })
}
