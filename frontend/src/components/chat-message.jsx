import { useContext } from 'react'
import UserContext from '../contexts/user-context'

export default function ChatMessage({ msg }) {
  const { state } = useContext(UserContext)
  const { user } = state

  return (
    <div className={msg.creatorId == user?.id ? 'sent-msg' : 'recieved-msg'}>
      <p>{msg.text}</p>
    </div>
  )
}
