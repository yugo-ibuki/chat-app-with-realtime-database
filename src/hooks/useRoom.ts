import { child, get, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { db } from '../configs/firebase'

export const useRoom = (roomId: string) => {
  const [roomName, setRoomName] = useState<string | null>('')

  useEffect(() => {
    ;(async () => {
      const chatRoomsRef = ref(db, 'chatRooms')
      const snapshot = await get(child(chatRoomsRef, roomId))
      if (snapshot.exists()) {
        setRoomName(snapshot.val().name)
      }
    })()
  }, [roomId])

  return {
    roomName,
  }
}
