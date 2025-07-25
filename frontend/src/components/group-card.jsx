import { useNavigate } from 'react-router'
import '../styles/group-card.css'

export default function GroupCard({ group }) {
  let navigate = useNavigate()
  return (
    <div className="group-card" onClick={() => navigate(`/group/${group.id}`)}>
      <p>{group.name}</p>
    </div>
  )
}
