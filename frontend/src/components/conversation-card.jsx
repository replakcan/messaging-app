import { useNavigate } from 'react-router'
import '../styles/conversation-card.css'

export default function ConversationCard({ conversation }) {
  let navigate = useNavigate()
  const { id, value, type } = conversation

  const handleClick = () => {
    if (type == 'group') {
      navigate(`/group/${id}`)
    } else if (type == 'user') {
      navigate(`/chat/${id}`)
    }
  }

  return (
    <div onClick={handleClick} className="conversation-card">
      <p>{value}</p>
    </div>
  )
}
