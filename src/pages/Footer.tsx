import { Chip, Divider, Stack, Typography } from "@mui/material";
import { type ReactElement } from "react";

export default function Footer(): ReactElement {
  return (
    <Stack direction="column" spacing={2} paddingY={2}>
      <Divider variant="fullWidth">
        <Chip label="About" />
      </Divider>

      <Typography variant="h6" fontStyle="italic" fontSize="2vw" textAlign="center">
        Developed by Eve Tyler, Jessica Wong, Glenn Neil, Chaoyang Wang, Leopold Lemmermann
      </Typography>
    </Stack>
  )
}