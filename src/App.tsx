import { forwardRef, type ReactElement } from "react"
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Link as RouterLink,
  type LinkProps as RouterLinkProps
} from "react-router-dom"
import { type LinkProps } from "@mui/material/Link"

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"

import Header from "./components/Header"
import WelcomePage from "./components/WelcomePage"

import useLocalStorage from "./lib/useLocalStorage"

// eslint-disable-next-line react/display-name
const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref): ReactElement => {
  const { href, ...other } = props
  return <RouterLink ref={ref} to={href} {...other} />
})

const theme = createTheme({
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
  },
  palette: {
    mode: "dark"
  }
})

export default function App(): ReactElement {
  const [auth, setAuth] = useLocalStorage("isAuthenticated", false)

  const login = async (email: string, password: string): Promise<boolean> => {
    // TODO: handle login
    console.log(email, password)
    setAuth(true)
    return true
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // TODO: handle register
    console.log(name, email, password)
    setAuth(true)
    return true
  }

  const search = (query: string): void => {
    console.log(query)
    // TODO: handle search
  }

  const logout = (): void => {
    // TODO: handle logout
    setAuth(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {auth ? (
          <Header search={search} logout={logout} />
        ) : (
          <WelcomePage login={login} register={register} />
        )}

        {auth && (
          <Routes>
            <Route path="" element={"Hello there"} />
          </Routes>
        )}
      </Router>
    </ThemeProvider>
  )
}
