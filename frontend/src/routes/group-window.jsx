import { useParams } from 'react-router'
import '../styles/chat-window.css'
import '../styles/root.css'
import { useContext, useEffect, useState } from 'react'
import { axiosInstance } from '../api/axios-instance'
import AuthContext from '../contexts/auth-context'
import ConversationHeader from '../components/conversation-window-header'
import ConversationChat from '../components/conversation-window-chat'
import ConversationFooter from '../components/conversation-window-footer'

export default function GroupWindow() {
  const { user } = useContext(AuthContext)
  const { groupId } = useParams()
  const [group, setGroup] = useState({})
  const [conversation, setConversation] = useState([])
  const [msg, setMsg] = useState({ text: '' })

  useEffect(() => {
    const fetchGroup = async () => {
      await axiosInstance
        .get(`/groups/${groupId}`)
        .then((res) => setGroup(res.data))
        .catch((err) => console.log(err))
    }

    const fetchConversation = async () => {
      await axiosInstance
        .get(`/groups/${groupId}/messages`)
        .then((res) => setConversation(res.data))
        .catch((err) => console.log(err))
    }

    fetchGroup()
    fetchConversation()
  }, [groupId])

  const handleChange = (e) => {
    const { name, value } = e.target

    setMsg((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axiosInstance
      .post(`/groups/${groupId}/messages`, msg)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))

    setMsg({ text: '' })
  }

  return (
    <div className="outlet-window">
      <ConversationHeader target={group} />
      <ConversationChat conversation={conversation} user={user} />
      <ConversationFooter
        onSubmit={handleSubmit}
        onChange={handleChange}
        msg={msg}
      />
    </div>
  )
}
