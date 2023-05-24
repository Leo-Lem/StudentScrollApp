import { IconType } from "../../../res/icons"
import { Tag } from "../../../res/tags"
import StudentLocation from "../../nearby/types/StudentLocation"

export default interface Profile {
  studentId: number
  name: string
  bio: string
  icon: IconType
  interests: Tag[]
  location?: StudentLocation
  followers: number[]
  follows: number[]
}
