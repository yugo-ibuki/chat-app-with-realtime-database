'use client'

import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

export const useCheckLoginStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
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
  }, [auth])

  return { loggedIn, loading }
}
