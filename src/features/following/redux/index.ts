import following from "./slice"

export default following.reducer

export const { addFollows, addFollowers, removeFollows, removeFollowers } = following.actions

export { default as follow } from "./actions/follow"
export { default as unfollow } from "./actions/unfollow"
export { default as readFollows } from "./actions/readFollows"
export { default as readFollowers } from "./actions/readFollowers"
