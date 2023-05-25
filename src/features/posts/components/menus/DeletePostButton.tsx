import { Delete } from "@mui/icons-material"
import { Fragment } from "react"

import { AsyncButton } from "../../../../components"

import { usePost } from "../../redux"

export default function DeletePostButton({ postId }: Props) {
  const { deletePost } = usePost(postId)

  return (
    <Fragment>
      {deletePost !== undefined && (
        <AsyncButton
          action={async () => {
            await deletePost()
            return true
          }}
          variant="text"
        >
          <Delete color="error" />
        </AsyncButton>
      )}
    </Fragment>
  )
}

interface Props {
  postId: number
}
