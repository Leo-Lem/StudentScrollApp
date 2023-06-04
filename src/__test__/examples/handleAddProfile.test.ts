import handleAddProfile from "../../features/profiles/redux/reducers/handleAddProfile"
import State from "../../features/profiles/redux/state"
import exampleProfile from "../utils/profile.example"

describe("handleAddProfile", () => {
  it("adds the profile to the state", () => {
    const state: State = [exampleProfile()]
    const oldState = state.slice()

    const action = { payload: exampleProfile() }

    handleAddProfile(state, action)

    expect(state).not.toEqual(oldState)
    expect(state).toHaveLength(2)
    expect(state[1]).toEqual(action.payload)
  })

  it("updates the profile if it already exists", () => {
    const profile = exampleProfile()
    const state: State = [profile]
    const oldState = state.slice()

    const action = { payload: { ...profile, name: "Jane Doe" } }

    handleAddProfile(state, action)

    expect(state).not.toEqual(oldState)
    expect(state).toHaveLength(1)
    expect(state[0]).toEqual(action.payload)
  })
})
