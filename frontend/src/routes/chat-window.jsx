import { useParams } from 'react-router'
import '../styles/chat-window.css'
import { useContext, useEffect, useState } from 'react'
import { axiosInstance } from '../api/axios-instance'
import AuthContext from '../contexts/auth-context'

export default function ChatWindow() {
  const { user } = useContext(AuthContext)
  const { contactId } = useParams()
  const [contact, setContact] = useState({})
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const fetchContact = async () => {
      await axiosInstance
        .get(`/auth/friends/${contactId}`)
        .then((res) => setContact(res.data))
        .catch((err) => console.log(err))
    }

    const fetchMessages = async () => {
      await axiosInstance
        .get(`/auth/messages/friends/${contactId}`)
        .then((res) => {
          console.log(res.data)
          setMessages(res.data)
        })
        .catch((err) => console.log(err))
    }

    fetchContact()
    fetchMessages()
  }, [contactId])

  return (
    <div className="outlet-window">
      <header className="chat-header">
        <p>{contact.phone}</p>
        <p>
          {contact.first_name} {contact.last_name}
        </p>
      </header>
      <main className="chat">
        {messages.map((message) => {
          return (
            <div className={message.creatorId == contactId ? 'recieved-msg' : 'sent-msg'} key={message.id}>
              <h3>
                {message.creatorId === contactId
                  ? `${contact.first_name} ${contact.last_name}`
                  : `${user.first_name} ${user.last_name}`}
              </h3>
              <p>{message.text}</p>
            </div>
          )
        })}
      </main>
      <footer className="chat-footer"></footer>
    </div>
  )
}
