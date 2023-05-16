import following from "./slice";

export default following.reducer

export const { addFollows, addFollowers, removeFollows, removeFollowers } = following.actions

export { default as follow } from "./api/follow"
export { default as unfollow } from "./api/unfollow"
export { default as readFollows } from "./api/readFollows"
export { default as readFollowers } from "./api/readFollowers"
