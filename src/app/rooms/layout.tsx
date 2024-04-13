'use client'

import { Box, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useUserContext } from '../../contexts/LoginUserContext'
import { ReactNode, useEffect } from 'react'

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const { user, loading } = useUserContext()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [loading, user, router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
      <Box rounded="lg" boxShadow="lg" p={8}>
        <Stack spacing={4}>{children}</Stack>
      </Box>
    </Stack>
  )
}
