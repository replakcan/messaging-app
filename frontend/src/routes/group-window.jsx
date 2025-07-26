import { useParams } from 'react-router'
import '../styles/chat-window.css'
import { useContext, useEffect, useState } from 'react'
import { axiosInstance } from '../api/axios-instance'
import AuthContext from '../contexts/auth-context'

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
      <header className="chat-header">
        <h1>{group.name}</h1>
      </header>
      <main className="chat">
        {conversation.map((msg) => {
          return (
            <p
              key={msg.id}
              className={msg.creatorId == user.id ? 'sent-msg' : 'recieved-msg'}
            >
              {msg.text}
            </p>
          )
        })}
      </main>
      <footer className="chat-footer">
        <form onSubmit={handleSubmit}>
          <label htmlFor="text">send message</label>
          <input
            type="text"
            name="text"
            id="text"
            value={msg.text}
            onChange={handleChange}
          />
          <button type="submit">send</button>
        </form>
      </footer>
    </div>
  )
}
