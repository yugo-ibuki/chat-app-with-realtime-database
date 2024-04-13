'use client'

import { useMessage } from '../../../libs/useMessage'
import { useParams } from 'next/navigation'
import { Box, Button, FormControl, Heading, Input } from '@chakra-ui/react'
import { useFetchRoomNameFromRoomId } from '../../../libs/useFetchRoomNameFromRoomId'

const Page = () => {
  const roomId = useParams<{ roomId: string }>().roomId
  const { messages, message, setMessage, createMessage } = useMessage(roomId)
  const { roomName } = useFetchRoomNameFromRoomId(roomId)

  return (
    <main>
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        チャットルーム
        <br />
        NAME: {roomName}
      </Heading>
      <div className="chat-container">
        <Box my="4" mx="4">
          <form onSubmit={createMessage}>
            <FormControl display="flex" alignItems="center">
              <Input
                mr="2"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                size="md"
              />
              <Button colorScheme="blue" px="8" type="submit">
                Send
              </Button>
            </FormControl>
          </form>
        </Box>
        <ul className="chat-messages">
          {messages.map((message) => (
            <li key={message.timestamp} className="message">
              <div className="message-header">
                <strong>{message.senderEmail}</strong>
                <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
              </div>
              <p className="message-content">{message.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default Page
