import { type ReactElement } from "react"
import { Card } from "@mui/material"
import ContentPost from "../models/ContentPost"

export default function ContentPostCard({ title, tags, content, posterId }: ContentPost): ReactElement {
  return (
    <Card>
      {title}
    </Card>
  )
}