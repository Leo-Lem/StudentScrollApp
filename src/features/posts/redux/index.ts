import posts from "./slice"

export default posts.reducer

export const { toggleNewestFirst, addCreatedPost, addPosts, removePost } = posts.actions
export { default as createPost } from "./api/createPost"
export { default as readPosts } from "./api/readPosts"
export { default as deletePost } from "./api/deletePost"