import { FormEvent, useEffect, useState } from 'react'
import { getDatabase, ref, onValue, push, update } from 'firebase/database'

interface ChatRoomData {
  name: string
}

interface ChatRoom extends ChatRoomData {
  id: string
}

export const useRooms = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [roomName, setRoomName] = useState('')

  useEffect(() => {
    const db = getDatabase()
    const chatRoomsRef = ref(db, 'chatRooms')

    const unsubscribe = onValue(chatRoomsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const roomList = Object.entries(data).map(([id, roomData]) => ({
          id,
          ...(roomData as ChatRoomData),
        }))
        setChatRooms(roomList)
      } else {
        setChatRooms([])
      }
    })

    return () => {
      console.log('Chat rooms listener detached')
      unsubscribe()
    }
  }, [])

  const createRoom = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (roomName.trim() !== '') {
      const db = getDatabase()
      const chatRoomsRef = ref(db, 'chatRooms')
      const newChatRoomRef = push(chatRoomsRef)
      const newChatRoom: ChatRoomData = {
        name: roomName.trim(),
      }
      try {
        await update(newChatRoomRef, newChatRoom)
        console.log('チャットルームが作成されました')
        setRoomName('')
      } catch (err) {
        console.error('チャットルームの作成に失敗しました:', err)
      }
    }
  }

  return {
    chatRooms,
    createRoom,
    roomName,
    setRoomName,
  }
}
