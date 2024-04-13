import { FormEvent, useEffect, useState } from 'react'
import { getDatabase, onValue, push, ref, set } from 'firebase/database'
import { useUserContext } from '../contexts/LoginUserContext'

interface Message {
  text: string
  senderEmail: string
  timestamp?: number
}

export const useMessage = (roomId: string) => {
  const { user } = useUserContext()
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!roomId) return

    const db = getDatabase()
    const messagesRef = ref(db, `chatRooms/${roomId}/messages`)

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const loadedMessages = []
      snapshot.forEach((childSnapshot) => {
        const messageData = childSnapshot.val()
        messageData.id = childSnapshot.key // データと共にキー（ID）も保存
        loadedMessages.push(messageData)
      })
      setMessages(loadedMessages)
    })

    // コンポーネントのアンマウント時にリスナーを解除
    return () => unsubscribe()
  }, [roomId])

  const createMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message.trim() === '') {
      alert('Message cannot be empty')
      return
    }

    const db = getDatabase()
    const messagesRef = ref(db, `chatRooms/${roomId}/messages`)
    const newMessageRef = push(messagesRef)

    const newMessage: Message = {
      senderEmail: user.email,
      text: message,
      timestamp: Date.now(),
    }

    try {
      await set(newMessageRef, newMessage)
      setMessage('') // Clear the input after sending
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  return {
    messages,
    message,
    setMessage,
    createMessage,
  }
}
