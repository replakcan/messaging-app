import { useParams } from 'react-router'
import '../styles/chat-window.css'
import { useContext, useEffect, useState } from 'react'
import { axiosInstance } from '../api/axios-instance'
import AuthContext from '../contexts/auth-context'

export default function ChatWindow() {
  const { user } = useContext(AuthContext)
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
      <header className="chat-header">
        <h1>{person.phone}</h1>
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
