import { Box, Text, Button } from '@chakra-ui/react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Text fontSize="48px" fontWeight="bold">
        404
      </Text>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you're looking for does not seem to exist
      </Text>

      <Link href="/" passHref>
        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
        >
          Go to Home
        </Button>
      </Link>
    </Box>
  )
}

export default NotFound
