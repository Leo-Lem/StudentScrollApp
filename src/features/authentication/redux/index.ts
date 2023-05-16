import authentication from "./slice"

export default authentication.reducer

export const { signOut, setAuthenticated, setFailed } = authentication.actions
export { default as signIn } from "./actions/signIn"
export { default as signUp } from "./actions/signUp"
