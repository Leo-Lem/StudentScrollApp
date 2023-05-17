import { type ReactNode, useState, type ReactElement } from "react"
import { Cancel, CheckCircle } from "@mui/icons-material"
import { Button, ButtonProps, CircularProgress } from "@mui/material"

export default function AsyncButton({
  children,
  action,
  ...buttonProps
}: Props & ButtonProps): ReactElement {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)

  const handleLoading = (): void => {
    setIsLoading(true)

    void action().then((newIsSuccess) => {
      setIsLoading(false)
      setIsSuccess(newIsSuccess)
      setTimeout(() => {
        setIsSuccess(null)
      }, 1000)
    })
  }

  const content = (): ReactNode => {
    if (isSuccess === null) return children
    else return isSuccess ? <CheckCircle /> : <Cancel />
  }

  return (
    <Button
      {...buttonProps}
      disabled={isLoading}
      startIcon={isSuccess === null && buttonProps.startIcon}
      color={isSuccess === null ? "primary" : isSuccess ? "success" : "error"}
      onClick={handleLoading}
    >
      {isLoading ? <CircularProgress /> : content()}
    </Button>
  )
}

interface Props {
  action: () => Promise<boolean>
}
