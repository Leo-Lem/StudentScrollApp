import { Grid } from "@mui/material";

import { AsyncButton, Label, RequiredTextField } from "../../../components";
import useBinding from "../../../lib/useBinding";
import { useAppDispatch } from "../../../redux";

import { sendMessage } from "../redux";

export default function MessageSendMenu({ receiverId }: Props) {
  const dispatch = useAppDispatch()

  const $newMessage = useBinding<string | undefined>("")

  const handleSendMessage = async (): Promise<boolean> => {
    if ($newMessage.get === "invalid") {
      return false
    } else if ($newMessage.get === undefined) {
      $newMessage.set("invalid")
      return false
    } else {
      await dispatch(sendMessage({ studentId: receiverId, content: $newMessage.get }))
      $newMessage.set(undefined)
      return true
    }
  }

  return (
    <Grid container direction="row" gap={1}>
      <Grid item xs>
        <RequiredTextField $value={$newMessage} label="Type your message here" variant="outlined" fullWidth />
      </Grid>

      <Grid item xs={2}>
        <AsyncButton action={handleSendMessage} variant="contained" color="primary" sx={{ width: "100%", height: "100%" }}>
          <Label type="send" />
        </AsyncButton>
      </Grid>
    </Grid>
  )
}

interface Props {
  receiverId: number
}