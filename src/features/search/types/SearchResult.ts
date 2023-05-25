export default interface SearchResult {
  id: "profileById" | "profileByName" | "profileByInterest" | "postByTitle" | "postByTags"
  value: any
}