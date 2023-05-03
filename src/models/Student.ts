import Location from "./Location"

export default interface Student {
  id: number
  name: string
  bio: string
  icon: string
  location?: Location
}
