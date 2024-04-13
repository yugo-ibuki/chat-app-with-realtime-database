'use client'

import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { Button } from '@chakra-ui/react'
import { auth } from '../../configs/firebase'
import { useUserContext } from '../../contexts/LoginUserContext'

const Page = () => {
  const router = useRouter()
  const { resetUser } = useUserContext()

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
    <main>
      rooms page
      <Button onClick={handleLogout}>ログアウト</Button>
    </main>
  )
}

export default Page
