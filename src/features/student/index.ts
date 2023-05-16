import student from "./slice"

export default student.reducer

export const { setSettings } = student.actions
export { default as readSettings } from "./actions/readSettings"
export { default as updateSettings } from "./actions/updateSettings"
export { default as loadStudent } from "./actions/loadStudent"
