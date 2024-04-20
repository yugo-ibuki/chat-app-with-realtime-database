'use client'

import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { usePageContext } from '../contexts/PageContext'

export const useCheckLoginStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const { loading, setLoading } = usePageContext()
  const auth = getAuth()

  useEffect(() => {
    setLoading(true)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })
    setLoading(false)
    return () => unsubscribe()
  }, [auth, setLoading])

  return { loggedIn, loading }
}
