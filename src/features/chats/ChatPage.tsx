import { type ReactElement } from "react"
import { Grid } from "@mui/material"
import { useParams } from "react-router"

import { useAppSelector } from "../../redux"

import ChatsList from "./components/ChatsList"
import ChatView from "./components/ChatView"

export default function ChatPage(): ReactElement {
  const { studentId } = useParams()
  const currentStudentId = useAppSelector((state) => state.student.id)

  const chatIsOpen = studentId !== undefined && !isNaN(parseInt(studentId)) && currentStudentId !== parseInt(studentId)

  return (
    <Grid container>
      <Grid item xs={4}>
        <ChatsList />
      </Grid>

      {chatIsOpen
        ? (
          <Grid item xs={7}>
            <ChatView studentId={parseInt(studentId)} />
          </Grid>
        )
        : "Click on a chat to open it…" // TODO: add better placeholder
      }

    </Grid>
  )
}
