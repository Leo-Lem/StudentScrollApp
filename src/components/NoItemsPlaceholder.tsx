import { Box, BoxProps } from "@mui/material"
import { useTranslation } from "react-i18next"

export default function NoItemsPlaceholder({ message, ...props }: BoxProps & Props) {
  const { t } = useTranslation()

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      {...props}
    >
      {t(message ?? "NO_ITEMS_PLACEHOLDER")}
    </Box>
  )
}

interface Props {
  message?: string
}
