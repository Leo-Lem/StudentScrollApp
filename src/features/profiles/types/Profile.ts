import { IconType } from "../../../res/icons"
import { Tag } from "../../../res/tags"
import StudentLocation from "../../nearby/types/Location"

export default interface Profile {
  name: string
  bio: string
  icon: IconType
  interests: Tag[]
  location?: StudentLocation
}
