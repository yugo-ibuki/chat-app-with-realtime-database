'use client'

import { Box, Center, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { usePageContext } from '../../contexts/PageContext'

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const { user, loading } = usePageContext()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [loading, user, router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!loading && !user) {
    router.push('/login')
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
