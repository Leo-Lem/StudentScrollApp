import { Delete } from "@mui/icons-material"
import { Fragment } from "react"

import { AsyncButton } from "../../../components"
import { useAppDispatch } from "../../../lib/hooks"

import { useStudentId } from "../../student"
import { deletePost } from "../redux"

export default function DeletePostButton({ postId, posterId }: Props) {
  const studentId = useStudentId()
  const dispatch = useAppDispatch()

  const deleteThis = async (): Promise<boolean> => {
    await dispatch(deletePost(postId))
    return true
  }

  return (
    <Fragment>
      {studentId !== null && studentId === posterId && (
        <AsyncButton action={deleteThis} variant="text">
          <Delete color="error" />
        </AsyncButton>
      )}
    </Fragment>
  )
}

interface Props {
  postId: number
  posterId: number
}
