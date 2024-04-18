import { FormEvent, useEffect, useState } from 'react'
import { ref, onValue, push, update, get, remove } from 'firebase/database'
import { db } from '../configs/firebase'
import { useUserContext } from '../contexts/LoginUserContext'
import { useToast } from '@chakra-ui/react'

type ChatRoomData = {
  name: string
  createdBy: string
}

type ChatRoom = ChatRoomData & {
  id: string
}

export const useRooms = () => {
  const toast = useToast()
  const { user } = useUserContext()
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [roomName, setRoomName] = useState('')

  useEffect(() => {
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
      unsubscribe()
    }
  }, [])

  const createRoom = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (roomName.trim() !== '') {
      const chatRoomsRef = ref(db, 'chatRooms')
      const newChatRoomRef = push(chatRoomsRef)
      const newChatRoom: ChatRoomData = {
        name: roomName.trim(),
        createdBy: user.id,
      }
      await update(newChatRoomRef, newChatRoom)
      setRoomName('')
    }
  }

  const deleteRoom = async (roomId: string) => {
    try {
      const roomRef = ref(db, `chatRooms/${roomId}`)

      // ルームの作成者を確認
      const snapshot = await get(roomRef)
      const roomData = snapshot.val()
      if (roomData.createdBy !== user.id) {
        throw new Error('Only the room creator can delete the room.')
      }

      await remove(roomRef)
    } catch (err) {
      toast({
        title: 'エラーが発生しました。',
        description:
          'チャットルームの削除に失敗しました。作成者のみが削除できます。',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return {
    chatRooms,
    createRoom,
    deleteRoom,
    roomName,
    setRoomName,
  }
}
