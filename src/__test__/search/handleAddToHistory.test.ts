import handleAddToHistory from "../../features/search/redux/reducers/handleAddToHistory"
import State from "../../features/search/redux/state"
import SearchResult from "../../features/search/types/SearchResult"
import examplePost from "../utils/post.example"
import exampleProfile from "../utils/profile.example"

describe("handleAddToHistory", () => {
  it("adds the result to the history", () => {
    const result: SearchResult = { id: "profile", value: exampleProfile() }
    const state: State = { __history__: [] }
    const oldState = state.__history__.slice()

    const action = { payload: result }

    handleAddToHistory(state, action)

    expect(state.__history__).not.toEqual(oldState)
    expect(state.__history__).toHaveLength(1)
    expect(state.__history__[0]).toEqual(result)
  })

  it("updates the profile result if it already exists", () => {
    const result: SearchResult = { id: "profile", value: exampleProfile() }
    const state: State = { __history__: [result] }
    const oldState = state.__history__.slice()

    const action = { payload: { ...result, value: { ...result.value, name: "Jane Doe" } } }

    handleAddToHistory(state, action)

    expect(state.__history__).not.toEqual(oldState)
    expect(state.__history__).toHaveLength(1)
    expect(state.__history__[0]).toEqual(action.payload)
  })

  it("updates the post result if it already exists", () => {
    const result: SearchResult = { id: "post", value: examplePost() }
    const state: State = { __history__: [result] }
    const oldState = state.__history__.slice()

    const action = { payload: { ...result, value: { ...result.value, title: "Example Post 2" } } }

    handleAddToHistory(state, action)

    expect(state.__history__).not.toEqual(oldState)
    expect(state.__history__).toHaveLength(1)
    expect(state.__history__[0]).toEqual(action.payload)
  })
})
