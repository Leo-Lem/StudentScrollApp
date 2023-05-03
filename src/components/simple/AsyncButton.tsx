import { Cancel, CheckCircle } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { type ReactNode, useState, type ReactElement } from "react";

export default function AsyncButton({ fullWidth, variant, startIcon, label, action }: Props): ReactElement {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)

  const handleLoading = (): void => {
    setIsLoading(true)

    void action()
      .then((isSuccess) => {
        setIsLoading(false)
        setIsSuccess(isSuccess)
        setTimeout(() => {
          setIsSuccess(null)
        }, 1000)
      })
  }

  const content = (): ReactNode => {
    if (isSuccess === null) return label
    else return isSuccess ? <CheckCircle /> : <Cancel />
  }

  return (
    <LoadingButton
      fullWidth={fullWidth}
      loading={isLoading}
      variant={variant}
      startIcon={isSuccess === null && startIcon}
      color={(isSuccess === null) ? "primary" : (isSuccess ? "success" : "error")}
      onClick={handleLoading}
    >
      {content()}
    </LoadingButton>
  )
}

interface Props {
  fullWidth?: boolean
  variant?: "contained" | "outlined" | "text"
  startIcon?: ReactNode
  label: ReactNode
  action: () => Promise<boolean>
}