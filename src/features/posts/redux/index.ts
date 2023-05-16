import posts from "./slice"

export default posts.reducer

export const { toggleNewestFirst, addCreatedPost, addPosts, removePost } = posts.actions
export { default as createPost } from "./actions/createPost"
export { default as readPosts } from "./actions/readPosts"
export { default as deletePost } from "./actions/deletePost"