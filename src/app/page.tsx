import { Box, Container, VStack, Text, Button } from '@chakra-ui/react'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      {' '}
      <Container centerContent p={8}>
        <VStack spacing={4} width="100%">
          <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            width="100%"
          >
            <Text fontSize="xl" textAlign="center">
              Thank you for coming to this site.
            </Text>
            <Text mt={4} textAlign="center">
              Please, take a little try to post a message and communicate.
            </Text>
          </Box>
          <Link href="/login" passHref>
            <Button as="a" colorScheme="blue" px={8}>
              Post a Message
            </Button>
          </Link>
        </VStack>
      </Container>
    </main>
  )
}
