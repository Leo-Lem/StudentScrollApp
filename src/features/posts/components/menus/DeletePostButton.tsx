import { Delete } from "@mui/icons-material"
import { Fragment } from "react"

import { AsyncButton } from "../../../../components"

import { usePost } from "../../redux"
import { ButtonProps } from "@mui/material"

export default function DeletePostButton({ postId, ...props }: Props & ButtonProps) {
  const { deletePost } = usePost(postId)

  return (
    <Fragment>
      {deletePost !== undefined && (
        <AsyncButton
          {...props}
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
