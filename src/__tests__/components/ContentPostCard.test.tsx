import "@testing-library/jest-dom"

import { render, screen } from "@testing-library/react"
import ContentPostCard from "../../components/ContentPostCard"
import { ContentPost } from "../../models"

const example: ContentPost = {
  title: "example title",
  tags: ["example tag 1", "example tag 2"],
  content: "example content",
  posterId: 1
}

beforeEach(() => render(<ContentPostCard post={example} />))

it("displays title", () => {
  expect(screen.getByText(example.title)).toBeInTheDocument()
})

it("displays content", () => {
  expect(screen.getByText(example.content)).toBeInTheDocument()
})

it("displays tags", () => {
  example.tags.forEach((tag) => {
    expect(screen.getByText(tag)).toBeInTheDocument()
  })
})
