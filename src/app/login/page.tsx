'use client'

import { LoginButton } from '../../components/LoginButton'
import { useRouter } from 'next/navigation'
import { useUserContext } from '../../contexts/LoginUserContext'

const Page = () => {
  const { user, loading } = useUserContext()
  const router = useRouter()

  if (loading) {
    return <div>Loading...</div>
  }

  if (user) {
    router.push('/rooms')
  } else {
    return <LoginButton />
  }
}

export default Page
