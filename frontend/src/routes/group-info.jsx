import { useEffect, useState } from 'react'
import { axiosInstance } from '../api/axios-instance'
import '../styles/group-info.css'
import { useParams } from 'react-router'

export default function GroupInfo() {
  const [group, setGroup] = useState({})
  const { groupId } = useParams()

  useEffect(() => {
    const fetchCatterInfo = async () => {
      axiosInstance
        .get(`/groups/${groupId}`)
        .then((res) => setGroup(res.data))
        .catch((err) => console.log(err))
    }

    fetchCatterInfo()
  }, [groupId])

  console.log(group)
  return (
    <div className="group-info-container">
      <div className="profile-container">
        <img src="" alt="" />

        <h3>{group.name}</h3>
        <p>
          Group - {group._count?.members}{' '}
          {group._count?.members == 1 ? 'member' : 'members'}
        </p>
      </div>

      <div className="group-admin-container">
        Group created by {group.admin?.phone}, on {group.createdAt}
      </div>

      <div className="general-options-container">
        <div className="profile-option">Starred messages</div>
        <div className="profile-option">Mute notifications</div>
        <div className="profile-option">Disappearing messages</div>
        <div className="profile-option">Advanced chat privacy</div>
        <div className="profile-option">Encryption</div>
      </div>

      <div>
        <h2>members ({group._count?.members}):</h2>
        <p>
          {group.admin?.phone} <em>Group Admin</em>
        </p>
        {group.members?.map((member) => {
          return <p key={member.id}>{member.phone}</p>
        })}
      </div>

      <div className="user-options-container">
        <div className="user-option">Report {group.name}</div>
        <div className="user-option">Exit group</div>
      </div>
    </div>
  )
}
