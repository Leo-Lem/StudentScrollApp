import { IosShare } from "@mui/icons-material"
import { IconButton } from "@mui/material"

export default function ShareButton({ title, url }: { title: string; url: string }) {
  const isAvailable = navigator.share !== undefined

  if (isAvailable)
    return (
      <IconButton onClick={() => void navigator.share({ title, url }).catch(() => {})}>
        <IosShare />
      </IconButton>
    )
  else return <></>
}
