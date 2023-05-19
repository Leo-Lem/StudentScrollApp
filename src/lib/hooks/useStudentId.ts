import useAppSelector from "./useAppSelector"

export default function useStudentId() {
  const studentId = useAppSelector((state) => state.student.id)
  if (studentId === undefined) throw Error("Not authenticated")
  else return studentId
}
