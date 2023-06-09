import { Cancel, CheckCircle } from "@mui/icons-material"
import { ToggleButton, ToggleButtonProps } from "@mui/material"
import { useState, type ReactNode } from "react"

import LoadingSpinner from "../LoadingSpinner"

export default function AsyncToggle({
  selected,
  children,
  action,
  ...props
}: Props & Omit<ToggleButtonProps, "value">) {
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
    <ToggleButton
      {...props}
      selected={selected}
      value={selected}
      disabled={isLoading || isSuccess !== null}
      color={isSuccess === null ? "primary" : isSuccess ? "success" : "error"}
      onChange={handleLoading}
    >
      {isLoading ? <LoadingSpinner /> : content()}
    </ToggleButton>
  )
}

interface Props {
  selected: boolean
  action: () => Promise<boolean>
}
