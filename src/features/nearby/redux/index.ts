import nearby from "./slice"

export default nearby.reducer

export const { addLocation, setStatus } = nearby.actions
export { default as saveLocation } from "./actions/saveLocation"
export { default as deleteLocation } from "./actions/deleteLocation"
export { default as readNearbyStudents } from "./actions/readNearbyStudents"
