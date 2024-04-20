'use client'

import { LoginButton } from '../../components/LoginButton'
import { useRouter } from 'next/navigation'
import { usePageContext } from '../../contexts/PageContext'

const Page = () => {
  const { user, loading } = usePageContext()
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
