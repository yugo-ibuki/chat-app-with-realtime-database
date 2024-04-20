'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../configs/firebase'

export type LoginUser = {
  id: string
  name: string | null
  email: string | null
}

type UserContextType = {
  user: LoginUser | null
  loading: boolean
  resetUser: () => void
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  resetUser: () => {},
})

export const useUserContext = () => useContext(UserContext)

type UserProviderProps = {
  children: ReactNode
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: User | null) => {
        if (firebaseUser) {
          // FirebaseUserからUserへの変換
          const user: LoginUser = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
          }
          setUser(user)
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  const resetUser = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, loading, resetUser }}>
      {children}
    </UserContext.Provider>
  )
}
