'use client'

import { Box, Center, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useUserContext } from '../../contexts/LoginUserContext'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user, loading } = useUserContext()
  const router = useRouter()

  if (loading) {
    return <div>Loading...</div>
  }

  if (user) {
    router.push('/rooms')
  }

  return (
    <Center h="100vh">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Box rounded="lg" boxShadow="lg" p={8}>
          <Stack spacing={4}>{children}</Stack>
        </Box>
      </Stack>
    </Center>
  )
}
