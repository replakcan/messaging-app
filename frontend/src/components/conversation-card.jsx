import { useNavigate, useLocation } from 'react-router'
import '../styles/conversation-card.css'

export default function ConversationCard({ conversation }) {
  const navigate = useNavigate()
  const location = useLocation()

  const { id, value, type } = conversation

  const isActive =
    (type === 'group' && location.pathname === `/group/${id}`) ||
    (type === 'user' && location.pathname === `/chat/${id}`)

  const handleClick = () => {
    if (type === 'group') {
      navigate(`/group/${id}`)
    } else if (type === 'user') {
      navigate(`/chat/${id}`)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`conversation-card ${isActive ? 'active' : ''}`}
    >
      <p>{value}</p>
    </div>
  )
}
