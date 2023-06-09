import {
  Chip,
  Divider,
  FormControl,
  FormLabel,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material"
import { createElement } from "react"
import { useTranslation } from "react-i18next"

import { Binding } from "../../../lib/hooks"
import { Theme, ThemeIcon, themes } from "../../../res/theme"

export default function ThemeSelect({ $theme }: Props) {
  const [t] = useTranslation()

  return (
    <FormControl>
      <FormLabel>
        <Divider variant="middle" sx={{ marginBottom: 1 }}>
          <Chip label={t("SETTINGS_THEME")} />
        </Divider>
      </FormLabel>

      <ToggleButtonGroup
        value={$theme.get}
        exclusive
        onChange={(_, newSelection) => {
          if (newSelection !== null) $theme.set(newSelection)
        }}
      >
        {themes.map((theme) => (
          <ToggleButton key={theme} value={theme} sx={{ flex: 1 }}>
            <Stack direction="column" alignItems="center">
              {createElement(ThemeIcon[theme] ?? <></>)}
              <Typography variant="button">{t(`THEME_${theme.toUpperCase()}`)}</Typography>
            </Stack>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </FormControl>
  )
}

interface Props {
  $theme: Binding<Theme>
}
