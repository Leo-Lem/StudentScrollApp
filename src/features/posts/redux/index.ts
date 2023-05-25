import posts from "./slice"

export default posts.reducer

export { default as useCreatePost } from "./hooks/useCreatePost"
export { default as usePost } from "./hooks/usePost"
export { default as useDashboardPosts } from "./hooks/useDashboardPosts"
export { default as useStudentPosts } from "./hooks/useStudentPosts"
