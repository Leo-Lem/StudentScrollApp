import { ContentPost } from "../../posts"
import { Profile } from "../../profiles"

export default interface SearchResult {
  id: "profileById" | "profileByName" | "profileByInterest" | "postByTitle" | "postByTags"
  value: Profile | ContentPost
}
