import { forwardRef, type ReactElement } from "react"
import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom"
import { type LinkProps } from "@mui/material/Link"
import { createTheme } from "@mui/material"

// eslint-disable-next-line react/display-name
const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref): ReactElement => {
  const { href, ...other } = props
  return <RouterLink ref={ref} to={href} {...other} />
})

export default createTheme({
  components: {
    MuiLink: {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      defaultProps: { component: LinkBehavior } as LinkProps
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior
      }
    }
  }
})
