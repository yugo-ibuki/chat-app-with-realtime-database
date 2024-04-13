'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'

export interface LoginUser {
  id: string
  name: string | null
  email: string | null
}

interface UserContextType {
  user: LoginUser | null
  loading: boolean
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
})

export const useUserContext = () => useContext(UserContext)

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = getAuth()
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

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  )
}
