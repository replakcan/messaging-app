import { useContext } from 'react'
import '../styles/settings-bar.css'
import AuthContext from '../contexts/auth-context'

export default function SettingsBar() {
  const { user } = useContext(AuthContext)

  return (
    <div className="settings-container">
      <p>{user.first_name}</p>
    </div>
  )
}
