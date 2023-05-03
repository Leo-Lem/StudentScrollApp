import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

import WelcomePage from "../pages/WelcomePage"

test("renders welcome message", () => {
  render(<WelcomePage />)

  const element = screen.getByText("Welcome to StudentScroll!")

  expect(element).toBeInTheDocument()
})

// TODO: add more tests
