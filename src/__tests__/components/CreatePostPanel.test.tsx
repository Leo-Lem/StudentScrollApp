import "@testing-library/jest-dom"
import CreatePostPanel from "../../components/CreatePostPanel"
import { render, screen } from "@testing-library/react"

beforeEach(() => render(<CreatePostPanel />))

it("displays title text field", () => {
  expect(screen.getByPlaceholderText("New Post")).toBeInTheDocument()
})

it("displays content text field", () => {
  expect(screen.getByPlaceholderText("What's on your mind?")).toBeInTheDocument()
})
