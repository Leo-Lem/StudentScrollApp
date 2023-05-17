import { List, ListItem, ListItemText } from "@mui/material";
import Message from "../types/Message";

export default function MessageList({ messages, name }: Props) {
  return (
    <List>
      {messages.map((message: Message) => (
        <ListItem key={message.id}>
          <ListItemText primary={message.content} secondary={name} />

          <ListItemText
            sx={{ textAlign: "right" }}
            primary={
              message.timestamp.toLocaleTimeString([], { year: "2-digit", month: "narrow", day: "2-digit", hour: "2-digit", minute: "2-digit" })
            }
          />
        </ListItem>
      ))}
    </List>
  )
}

interface Props {
  messages: Message[]
  name: string
}