import { useDispatch, type TypedUseSelectorHook, useSelector } from "react-redux"
import { AppDispatch, RootState } from "./store"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export function useStudentId() {
  const studentId = useAppSelector((state) => state.student.id)
  if (studentId === undefined) throw Error("Not authenticated")
  else return studentId
}
