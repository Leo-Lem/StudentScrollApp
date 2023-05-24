import authentication from "./slice"

export default authentication.reducer

export { default as useAuthenticate } from "./hooks/useAuthenticate"
export { default as useAuthenticationStatus } from "./hooks/useAuthenticationStatus"
export { default as useSignOut } from "./hooks/useSignOut"
