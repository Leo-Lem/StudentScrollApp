import { ContentPost } from "../../posts"
import { Profile } from "../../profiles"

type SearchResult = { id: "profile"; value: Profile } | { id: "post"; value: ContentPost }

export default SearchResult
