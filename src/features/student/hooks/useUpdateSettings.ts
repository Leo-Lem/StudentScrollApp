import { useAppDispatch } from "../../../lib/hooks"

import updateSettings from "../actions/updateSettings"

export default function useUpdateProfile(): (
  newTheme?: string,
  newLocale?: string
) => Promise<void> {
  const dispatch = useAppDispatch()

  return async (newTheme?: string, newLocale?: string) => {
    await dispatch(updateSettings({ newTheme, newLocale }))
  }
}
