import student from "./slice"

export default student.reducer

export const { setSettings } = student.actions
export { default as loadStudent } from "./actions/loadStudent"

export { default as useStudentId } from "./hooks/useStudentId"
export { default as useSettings } from "./hooks/useSettings"
export { default as useUpdateSettings } from "./hooks/useUpdateSettings"
