'use client'

import { useRooms } from '../../hooks/useRooms'
import Link from 'next/link'
import { Box, Button, Flex, Heading, Input, VStack } from '@chakra-ui/react'

const Page = () => {
  const { chatRooms, createRoom, deleteRoom, roomName, setRoomName } =
    useRooms()
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
              <Flex
                key={room.id}
                borderWidth={1}
                borderRadius="md"
                boxShadow="md"
                _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
                w="full"
                align="center"
                justify="space-between"
                px={2}
              >
                <Link
                  href={`/rooms/${room.id}`}
                  style={{
                    width: '100%',
                  }}
                >
                  <Heading as="h3" size="md" p={4}>
                    {room.name}
                  </Heading>
                </Link>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => deleteRoom(room.id)}
                >
                  削除
                </Button>
              </Flex>
            ))}
          </VStack>
        </Box>
      </Box>
    </main>
  )
}

export default Page
