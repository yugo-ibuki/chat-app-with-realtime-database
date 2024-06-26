'use client'

import { useMessage } from '../../../hooks/useMessage'
import { useParams } from 'next/navigation'
import { Box, Button, FormControl, Heading, Input } from '@chakra-ui/react'
import { useRoom } from '../../../hooks/useRoom'
import { usePresences } from '../../../hooks/usePresences'

const Page = () => {
  const roomId = useParams<{ roomId: string }>().roomId
  const { messages, message, setMessage, createMessage } = useMessage(roomId)
  const { roomName } = useRoom(roomId)
  const { presence } = usePresences(roomId)

  return (
    <main>
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        チャットルーム
        <br />
        ルーム名: {roomName}
        <br />
        参加人数: {presence.length}
      </Heading>
      <div>
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
        <ul>
          {messages.map((message) => (
            <li key={message.timestamp.toString()}>
              <div>
                <strong>{message.senderEmail}</strong>
                <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
              </div>
              <p>{message.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default Page
