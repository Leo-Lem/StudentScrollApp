import { type LinkProps } from "@mui/material/Link"
import { forwardRef } from "react"
import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom"

// eslint-disable-next-line react/display-name
const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props
  return <RouterLink ref={ref} to={href} {...other} />
})

const linkSettings = {
  components: {
    MuiLink: {
      defaultProps: { component: LinkBehavior } as LinkProps
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior
      }
    }
  }
}

export default linkSettings
