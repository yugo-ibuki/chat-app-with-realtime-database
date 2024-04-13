'use client'

import { signInWithPopup } from 'firebase/auth'
import { auth } from '../configs/firebase'
import { GoogleAuthProvider } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { Button } from '@chakra-ui/react'
import { getDatabase, ref, set } from 'firebase/database'

type UserData = {
  uid: string
  displayName: string | null
  email: string | null
}

export const LoginButton = () => {
  const router = useRouter()

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const { user } = await signInWithPopup(auth, provider)
      const userData: UserData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      }
      await saveUserToDatabase(userData)
      router.push('/rooms')
    } catch (error) {
      console.error('ログインエラー:', error)
    }
  }

  return (
    <div>
      <Button onClick={handleGoogleLogin}>Google でログイン</Button>
    </div>
  )
}

const saveUserToDatabase = async (userData: UserData) => {
  const db = getDatabase()
  const userRef = ref(db, `users/${userData.uid}`)
  try {
    const registeredUser = await set(userRef, userData)
    console.log(registeredUser)
    console.log('ユーザーデータが保存されました')
  } catch (err) {
    console.error('ユーザーデータの保存エラー:', err)
  }
}
