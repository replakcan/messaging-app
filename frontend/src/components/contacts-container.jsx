import { useEffect, useState } from 'react'
import '../styles/contacts-container.css'
import { axiosInstance } from '../api/axios-instance'
import ContactCard from './contact-card'
import GroupCard from './group-card'

export default function ContactsContainer() {
  const [friends, setFriends] = useState([])
  const [groups, setGroups] = useState({ adminOfGroups: [], memberOfGroups: [] })

  useEffect(() => {
    const fetchFriends = async () => {
      await axiosInstance
        .get('/auth/friends')
        .then((res) => setFriends(res.data))
        .catch((err) => console.log(err))
    }

    const fetchGroups = async () => {
      await axiosInstance
        .get('/auth/groups')
        .then((res) =>
          setGroups((prevState) => ({
            ...prevState,
            adminOfGroups: res.data.adminOfGroups,
            memberOfGroups: res.data.memberOfGroups,
          }))
        )
        .catch((err) => console.log(err))
    }

    fetchFriends()
    fetchGroups()
  }, [])

  return (
    <div className="contacts-container">
      {friends.map((friend) => (
        <ContactCard key={friend.id} contact={friend} />
      ))}

      {groups.adminOfGroups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}

      {groups.memberOfGroups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </div>
  )
}
