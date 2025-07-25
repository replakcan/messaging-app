import { useNavigate } from 'react-router'
import '../styles/contact-card.css'

export default function ContactCard({ contact }) {
  let navigate = useNavigate()
  return (
    <div className="contact-card" onClick={() => navigate(`/chat/${contact.id}`)}>
      <p>{contact.phone}</p>
      <p>
        {contact.first_name} {contact.last_name}
      </p>
    </div>
  )
}
