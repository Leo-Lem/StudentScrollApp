import nearby from "./slice"

export default nearby.reducer

export const { addLocation } = nearby.actions
export { default as saveLocation } from "./actions/saveLocation"
