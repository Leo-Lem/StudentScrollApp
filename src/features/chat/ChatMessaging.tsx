import React, { useState, useEffect } from "react"
import {
  Box,
  Stack,
  List,
  Typography,
  ListItem,
  TextField,
  Button,
  ListItemText
} from "@mui/material"

interface IMessage {
  author: string
  message: string
  timestamp: Date
}

const ChatMessaging: React.FC = () => {
  const [message, setMessage] = useState<string>("")
  const [messages, setMessages] = useState<IMessage[]>([])

  const postMessage = async (value: string): Promise<void> => {
    const newMessage = {
      author: "Testing User",
      message,
      timestamp: new Date()
    }
    const response = await fetch("api/v1/chat/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMessage)
    })
    const data = await response.json()
    setMessages(data)
  }

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      const response = await fetch("/api/v1/chat/messages/get")
      const data = await response.json()
      setMessages(data)
    }
    loadData().catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <Box display="flex" flexDirection="column" alignItems="right">
      <Stack spacing={2} marginTop={3}>
        <List className="messageList">
          {messages.map((msg, index) => (
            <ListItem key={index} className="messageItem">
              <ListItemText
                primary={
                  <>
                    <Typography variant="body1" className="messageAuthor">
                      {msg.author}:
                    </Typography>
                    <Typography variant="body1" component="span">
                      {msg.message}
                    </Typography>
                  </>
                }
                secondary={
                  <Typography variant="body2" className="messageTimestamp">
                    {msg.timestamp.toLocaleString()}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
        <List className="inputContainer">
          <TextField
            className="inputField"
            label="Type your message here"
            variant="outlined"
            value={message}
            onChange={({ target: { value } }) => {
              setMessage(value)
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={(event: React.FormEvent<HTMLButtonElement>) => {
              event.preventDefault()
              postMessage(message).catch((err) => {
                console.log(err)
              })
              setMessage("")
            }}
          >
            Send
          </Button>
        </List>
      </Stack>
    </Box>
  )
}

export default ChatMessaging
