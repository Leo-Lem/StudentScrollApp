import settings from "./slice";

export default settings.reducer

export const { setSettings } = settings.actions

export { default as readSettings } from "./actions/readSettings"
export { default as updateSettings } from "./actions/updateSettings"