'use client'

import { Box, Button, Flex, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../configs/firebase'
import { usePageContext } from '../../contexts/PageContext'

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const { user, loading, resetUser } = usePageContext()
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

  const handleLogout = async () => {
    try {
      await signOut(auth)
      resetUser()
      console.log('ログアウトしました')
      router.push('/login')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" py={8} px={5}>
        <Box>
          user: <p>{user.email}</p>
        </Box>
        <Box>
          <Button onClick={handleLogout}>ログアウト</Button>
        </Box>
      </Flex>

      <Stack py={3} px={5}>
        {children}
      </Stack>
    </>
  )
}
