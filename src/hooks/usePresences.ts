import {
  onChildAdded,
  onChildRemoved,
  onDisconnect,
  ref,
  set,
} from 'firebase/database'
import { db } from '../configs/firebase'
import { useEffect, useState } from 'react'

type Props = {
  roomId: string
  userId: string
}

export const usePresences = ({ roomId, userId }: Props) => {
  const [presence, setPresence] = useState<{ id: string }[]>([])

  useEffect(() => {
    const roomPresenceRef = ref(db, `presence/${roomId}`)
    const userPresenceRef = ref(db, `presence/${roomId}/${userId}`)

    // ユーザーがルームに参加したときの処理
    set(userPresenceRef, true)

    // ユーザーがルームから離れたときの処理
    onDisconnect(userPresenceRef).remove()

    // 他のユーザーのプレゼンス状態を監視
    const onJoin = onChildAdded(roomPresenceRef, (snapshot) => {
      const newUserId = snapshot.key
      setPresence((prevPresence) => {
        // 重複排除
        const userSet = new Set(prevPresence.map((user) => user.id))
        if (!userSet.has(newUserId)) {
          return [...prevPresence, { id: newUserId }]
        }
        return prevPresence
      })
    })

    const onLeave = onChildRemoved(roomPresenceRef, (snapshot) => {
      const removedUserId = snapshot.key
      setPresence((prevPresence) =>
        prevPresence.filter((user) => user.id !== removedUserId)
      )
    })

    return () => {
      onJoin()
      onLeave()

      // ユーザーのプレゼンス情報を削除
      set(userPresenceRef, null)
    }
  }, [roomId, userId])

  return {
    presence,
  }
}
