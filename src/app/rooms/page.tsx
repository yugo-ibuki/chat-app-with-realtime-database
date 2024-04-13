'use client'

import { useRooms } from '../../libs/useRooms'
import Link from 'next/link'
import { Box, Button, Heading, Input, VStack } from '@chakra-ui/react'

const Page = () => {
  const { chatRooms, createRoom, roomName, setRoomName } = useRooms()
  return (
    <main>
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        チャットルーム一覧
      </Heading>
      <Box mx="auto" maxW="25rem">
        <form onSubmit={createRoom}>
          <VStack spacing={4} align="stretch">
            <Input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="チャットルーム名"
              size="lg"
              variant="outline"
              colorScheme="blue"
            />
            <Button type="submit" size="lg" colorScheme="blue">
              作成
            </Button>
          </VStack>
        </form>
        <Box mt={10}>
          <VStack spacing={4} align="stretch">
            {chatRooms.map((room) => (
              <Box
                key={room.id}
                borderWidth={1}
                borderRadius="md"
                boxShadow="md"
                _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
              >
                <Link href={`/rooms/${room.id}`}>
                  <Heading as="h3" size="md" p={4}>
                    {room.name}
                  </Heading>
                </Link>
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>
    </main>
  )
}

export default Page
