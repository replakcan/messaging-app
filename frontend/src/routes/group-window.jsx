import { useParams } from 'react-router'
import '../styles/chat-window.css'
import { useContext, useEffect, useState } from 'react'
import { axiosInstance } from '../api/axios-instance'
import AuthContext from '../contexts/auth-context'

export default function GroupWindow() {
  const { user } = useContext(AuthContext)
  const { groupId } = useParams()
  const [group, setGroup] = useState({})
  const [messages, setMessages] = useState([])
  const [msg, setMsg] = useState({ text: '' })

  useEffect(() => {
    const fetchGroup = async () => {
      await axiosInstance
        .get(`/auth/groups/${groupId}`)
        .then((res) => setGroup(res.data))
        .catch((err) => console.log(err))
    }

    const fetchMessages = async () => {
      await axiosInstance
        .get(`/auth/messages/groups/${groupId}`)
        .then((res) => {
          console.log(res.data)
          setMessages(res.data)
        })
        .catch((err) => console.log(err))
    }

    fetchGroup()
    fetchMessages()
  }, [groupId])

  const handleChange = (e) => {
    const { name, value } = e.target

    setMsg((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axiosInstance
      .post(`/auth/messages/groups/${groupId}`, msg)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))

    setMsg({ text: '' })
  }

  return (
    <div className="outlet-window">
      <header className="chat-header">
        <p>{group.name}</p>
        <p>
          {group.admin?.phone},{' '}
          {group.members?.map((member) => member.phone + ',')}
        </p>
      </header>
      <main className="chat">
        {messages.map((message) => {
          return (
            <div
              className={
                message.creatorId == user.id ? 'sent-msg' : 'recieved-msg'
              }
              key={message.id}
            >
              <h3>
                {message.creatorId == user.id
                  ? `${user.first_name} ${user.last_name}`
                  : ''}
              </h3>
              <p>{message.text}</p>
            </div>
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
