import { Tag } from "../../../res/tags"

export default interface ContentPost {
  id: number
  title: string
  tags: Tag[]
  content: string
  posterId: number
}
