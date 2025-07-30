import { useContext } from 'react'
import '../styles/contacts-container.css'
import ConversationCard from './conversation-card'
import UserContext from '../contexts/user-context'

export default function ContactsContainer() {
  const { state } = useContext(UserContext)
  const { filteredConversations } = state

  return (
    <div className="contacts-container">
      {filteredConversations?.map((conversation) => (
        <ConversationCard key={conversation.id} conversation={conversation} />
      ))}
    </div>
  )
}
