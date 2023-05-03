export default function studentId(): number {
  const id = localStorage.getItem("id")

  if (id == null) throw Error("Not authenticated")
  else return JSON.parse(id)
}
