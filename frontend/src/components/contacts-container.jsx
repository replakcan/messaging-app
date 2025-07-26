import { useEffect, useState } from 'react'
import '../styles/contacts-container.css'
import { axiosInstance } from '../api/axios-instance'
import ConversationCard from './conversation-card'

export default function ContactsContainer() {
  const [distinctConversations, setDistinctConversations] = useState([])

  useEffect(() => {
    const fetchDistinctConversations = async () => {
      await axiosInstance
        .get('/auth/me/conversations')
        .then((res) => setDistinctConversations(res.data))
        .catch((err) => console.log(err))
    }

    fetchDistinctConversations()
  }, [])

  return (
    <div className="contacts-container">
      {distinctConversations.map((conversation) => (
        <ConversationCard key={conversation.id} conversation={conversation} />
      ))}
    </div>
  )
}
