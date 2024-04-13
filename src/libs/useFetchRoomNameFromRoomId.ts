import { child, get, getDatabase, ref } from 'firebase/database'
import { useEffect, useState } from 'react'

export const useFetchRoomNameFromRoomId = (roomId: string) => {
  const [roomName, setRoomName] = useState<string | null>('')

  useEffect(() => {
    ;(async () => {
      const db = getDatabase()
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
