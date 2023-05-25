import { ContentPost } from "../../posts"
import { Profile } from "../../profiles"

type SearchResult =
  | { id: "profileById"; value: Profile }
  | { id: "profileByName"; value: Profile }
  | { id: "profileByInterest"; value: Profile }
  | { id: "postByTitle"; value: ContentPost }
  | { id: "postByTags"; value: ContentPost }

export default SearchResult
