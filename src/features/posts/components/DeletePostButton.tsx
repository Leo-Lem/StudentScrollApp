import { Fragment, ReactElement } from "react"
import { Delete } from "@mui/icons-material"

import { useAppDispatch, useAppSelector } from "../../../redux"
import { AsyncButton } from "../../../components"
import { deletePost } from "../redux"

export default function DeletePostButton({ postId, posterId }: Props): ReactElement {
  const studentId = useAppSelector((state) => state.authentication.studentId)
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
