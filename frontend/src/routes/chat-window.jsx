import { useParams } from 'react-router'
import '../styles/chat-window.css'
import { useEffect, useState } from 'react'
import { axiosInstance } from '../api/axios-instance'
import ConversationHeader from '../components/conversation-window-header'
import ConversationChat from '../components/conversation-window-chat'
import ConversationFooter from '../components/conversation-window-footer'

export default function ChatWindow() {
  const { receiverId } = useParams()
  const [person, setPerson] = useState({})
  const [conversation, setConversation] = useState([])
  const [msg, setMsg] = useState({ text: '' })

  useEffect(() => {
    const fetchPerson = async () => {
      await axiosInstance
        .get(`/users/${receiverId}`)
        .then((res) => {
          setPerson(res.data)
        })
        .catch((err) => console.log(err))
    }

    const fetchConversation = async () => {
      await axiosInstance
        .get(`/auth/me/conversations/${receiverId}`)
        .then((res) => setConversation(res.data))
        .catch((err) => console.log(err))
    }

    fetchPerson()
    fetchConversation()
  }, [receiverId])

  const handleChange = (e) => {
    const { name, value } = e.target

    setMsg((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axiosInstance
      .post(`/messages`, { ...msg, to: person.phone })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))

    setMsg({ text: '' })
  }

  return (
    <div className="outlet-window">
      <ConversationHeader target={person} />
      <ConversationChat conversation={conversation} />
      <ConversationFooter
        onSubmit={handleSubmit}
        onChange={handleChange}
        msg={msg}
      />
    </div>
  )
}
