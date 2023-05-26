import SearchResult from "../../types/SearchResult"
import State from "../state"

export default function handleAddToHistory(state: State, action: { payload: SearchResult }) {
  const index = state.__history__.findIndex((result) => {
    if (result.id === "profile" && action.payload.id === "profile")
      return result.value.studentId === action.payload.value.studentId
    else if (result.id === "post" && action.payload.id === "post")
      return result.value.id === action.payload.value.id
    else return false
  })
  if (index !== -1) state.__history__.splice(index, 1)
  state.__history__.unshift(action.payload)
}
