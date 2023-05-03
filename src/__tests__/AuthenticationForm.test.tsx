import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import AuthenticationForm from "../components/AuthenticationForm"

beforeEach(() => {
  render(<AuthenticationForm />)
})

it("shows the signin button", () => {
  expect(screen.getByText("Sign in")).toBeInTheDocument
})

it("shows the email address textfield", () => {
  expect(screen.getByLabelText("Email")).toBeInTheDocument
})

it("shows the password textfield", () => {
  expect(screen.getByLabelText("Password")).toBeInTheDocument
})
