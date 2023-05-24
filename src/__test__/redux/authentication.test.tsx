import reducer from "../../features/authentication/redux"

it("returns the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    status: "unauthenticated"
  })
})
