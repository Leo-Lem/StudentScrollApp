import AuthenticationStatus from "../../features/authentication/types/AuthenticationStatus"
import reducer from "../../features/authentication/redux"

it("returns the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    status: AuthenticationStatus.unauthenticated
  })
})
