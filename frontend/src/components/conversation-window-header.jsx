import { useNavigate } from 'react-router'

export default function ConversationHeader({ target }) {
  let navigate = useNavigate()

  const handleClick = () => {
    navigate('info')
  }

  return (
    <header className="chat-header" onClick={handleClick}>
      <h1>{target.phone ? target.phone : target.name}</h1>
    </header>
  )
}
