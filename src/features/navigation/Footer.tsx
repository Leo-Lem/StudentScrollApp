import { Chip, Divider, Stack, Typography } from "@mui/material"
import { type ReactElement } from "react"
import { useTranslation } from "react-i18next"

import { Label } from "../../components"

export default function Footer(): ReactElement {
  const [t] = useTranslation()

  return (
    <Stack direction="column" spacing={1}>
      <Divider sx={{ marginTop: 5 }}>
        <Chip label={<Label type="about" fontSize="small" />} />
      </Divider>

      <Typography
        variant="h6"
        fontStyle="italic"
        fontSize="0.8em"
        textAlign="center"
        textOverflow="ellipsis"
        overflow="scroll"
        noWrap
      >
        {t("CREATED_BY", {
          names: "Eve Tyler, Jessica Wong, Glenn Neil, Chaoyang Wang, Leopold Lemmermann"
        })}
      </Typography>
    </Stack>
  )
}
