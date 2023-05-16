import authentication from "./slice"

export default authentication.reducer

export { default as signIn } from "./api/signIn"
export { default as signUp } from "./api/signUp"
export const { signOut, setAuthenticated, setFailed } = authentication.actions