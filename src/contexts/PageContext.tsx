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

type PageContextType = {
  user: LoginUser | null
  loading: boolean
  setLoading: (loading: boolean) => void
  resetUser: () => void
}

const PageContext = createContext<PageContextType>({
  user: null,
  loading: true,
  setLoading: () => {},
  resetUser: () => {},
})

export const usePageContext = () => useContext(PageContext)

type UserProviderProps = {
  children: ReactNode
}

export const PageProvider: FC<UserProviderProps> = ({ children }) => {
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
    <PageContext.Provider value={{ user, loading, setLoading, resetUser }}>
      {children}
    </PageContext.Provider>
  )
}
