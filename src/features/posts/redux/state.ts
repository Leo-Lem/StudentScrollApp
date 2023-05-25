import ContentPost from "../types/ContentPost"

export default interface State {
  posts: ContentPost[]
}

export const initialState: State = {
  posts: []
}
