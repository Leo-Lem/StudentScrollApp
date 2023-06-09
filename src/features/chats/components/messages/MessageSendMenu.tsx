import { Grid } from "@mui/material"

import { AsyncButton, Label, RequiredTextField } from "../../../../components"
import { useBinding, useIsCompact } from "../../../../lib/hooks"
import { useSendMessage } from "../../redux"

export default function MessageSendMenu({ chatId }: Props) {
  const isCompact = useIsCompact()

  const sendMessage = useSendMessage()
  const $newMessage = useBinding<string | undefined>(undefined)

  const handleSendMessage = async (): Promise<boolean> => {
    if ($newMessage.get === "invalid") {
      return false
    } else if ($newMessage.get === undefined) {
      $newMessage.set("invalid")
      return false
    } else {
      sendMessage(chatId, $newMessage.get)
      $newMessage.set(undefined)
      return true
    }
  }

  return (
    <Grid container direction="row" spacing={1}>
      <Grid item xs>
        <RequiredTextField
          $value={$newMessage}
          label="Type your message here"
          variant="outlined"
          fullWidth
          onKeyDown={({ key }) => {
            if (key === "Enter") handleSendMessage()
          }}
        />
      </Grid>

      <Grid item xs={3} md={2}>
        <AsyncButton
          action={handleSendMessage}
          variant="contained"
          color="primary"
          sx={{ width: "100%", height: "100%" }}
        >
          <Label type="send" display={isCompact ? "iconOnly" : undefined} />
        </AsyncButton>
      </Grid>
    </Grid>
  )
}

interface Props {
  chatId: number
}
