'use client'

import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { Button } from '@chakra-ui/react'
import { auth } from '../../configs/firebase'

const Page = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut(auth)
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
