import { Profile } from "../../features/profiles"

export default function exampleProfile(): Profile {
  return {
    studentId: Math.floor(Math.random() * 100),
    name: "John Doe",
    bio: "I am a student",
    icon: "student",
    interests: ["math", "science"],
    followers: [],
    follows: []
  }
}
