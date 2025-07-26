import { useContext } from 'react'
import AuthContext from '../contexts/auth-context'

export default function ChatMessage({ msg }) {
  const { user } = useContext(AuthContext)

  return (
    <div className={msg.creatorId == user.id ? 'sent-msg' : 'recieved-msg'}>
      <p>{msg.text}</p>
    </div>
  )
}
