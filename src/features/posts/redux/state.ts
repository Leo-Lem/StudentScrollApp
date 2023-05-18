import ContentPost from "../types/ContentPost"

export default interface State {
  posts?: ContentPost[]
  newestFirst: boolean
  pageSize: number
  nextPage: number | undefined
  studentPosts: {
    [posterId: number]: ContentPost[]
  }
}

export const initialState: State = {
  newestFirst: true,
  pageSize: 10,
  nextPage: 0,
  studentPosts: {}
}
