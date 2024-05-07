import { Box, Text } from '@chakra-ui/react'

const NotFound = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Text fontSize="48px" fontWeight="bold">
        404
      </Text>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
    </Box>
  )
}

export default NotFound
