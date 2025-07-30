import '../styles/settings-bar.css'
import { Cat, MessageSquare, Rss, Settings, UsersRound } from 'lucide-react'

export default function SettingsBar() {
  return (
    <div className="settings-container">
      <div className='first-icon-group'>
        <MessageSquare size={40} />
        <Cat size={40} />
        <Rss size={40} />
        <UsersRound size={40} />
      </div>
      <div className='last-icon-group'>
        <Settings size={40} />
        <img src="placeholder" alt="" />
      </div>
    </div>
  )
}
