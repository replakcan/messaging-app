import { useEffect, useState } from 'react'
import { axiosInstance } from '../api/axios-instance'
import { useParams } from 'react-router'
import '../styles/chatter-info.css'

export default function ChatterInfo() {
  const [chatter, setChatter] = useState({})
  const { receiverId } = useParams()

  useEffect(() => {
    const fetchCatterInfo = async () => {
      axiosInstance
        .get(`/users/${receiverId}`)
        .then((res) => setChatter(res.data))
        .catch((err) => console.log(err))
    }

    fetchCatterInfo()
  }, [receiverId])

  console.log(chatter)
  return (
    <div className="chatter-info-container">
      <div className="profile-container">
        <img src="" alt="" />

        <h3>{chatter.phone}</h3>
      </div>

      <div className="about-container">
        <h3>About</h3>
        <p>
          {chatter.status_message
            ? chatter.status_message
            : 'Hey there Im using zortingen'}
        </p>
      </div>

      <div className="general-options-container">
        <div className="profile-option">Starred messages</div>
        <div className="profile-option">Mute notifications</div>
        <div className="profile-option">Disappearing messages</div>
        <div className="profile-option">Advanced chat privacy</div>
        <div className="profile-option">Encryption</div>
      </div>

      <div className="user-options-container">
        <div className="user-option">Add to favorites</div>
        <div className="user-option">Block {chatter.phone}</div>
        <div className="user-option">Report {chatter.phone}</div>
        <div className="user-option">Delete chat</div>
      </div>
    </div>
  )
}
