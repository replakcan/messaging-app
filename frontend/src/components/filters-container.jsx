import { EllipsisVertical, MessageSquarePlus } from 'lucide-react'
import '../styles/filters-container.css'
import { useContext, useState } from 'react'
import UserContext from '../contexts/user-context'
import { ACTIONS } from '../reducers/user-reducer'
import NewChatCreatorDialog from './new-chat-creator-dialog'

export default function FiltersContainer() {
  const { state, dispatch } = useContext(UserContext)
  const { activeFilter } = state
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAllClick = () => {
    dispatch({ type: ACTIONS.RESET_FILTERS })
  }

  const handleGroupsClick = () => {
    dispatch({ type: ACTIONS.FILTER_CONTACTS_BY_TYPE, payload: 'group' })
  }

  const handleNewMessageClick = () => {
    setIsDialogOpen(true)
  }

  const handleNewMessageDialogCloseClick = () => {
    setIsDialogOpen(false)
  }

  return (
    <div className="filters-container">
      <NewChatCreatorDialog isDialogOpen={isDialogOpen} onCloseDialogClick={handleNewMessageDialogCloseClick} />
      <header>
        <h3 className="app-name">MesajApp</h3>
        <div className="icon-group">
          <MessageSquarePlus onClick={handleNewMessageClick} />
          <EllipsisVertical />
        </div>
      </header>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search or start a new chat"
          name="search"
          id="search"
        />
      </div>

      <div className="chat-filters">
        <button
          className={activeFilter === 'all' ? 'active' : ''}
          onClick={handleAllClick}
        >
          All
        </button>
        <button
          className={activeFilter === 'group' ? 'active' : ''}
          onClick={handleGroupsClick}
        >
          Groups
        </button>
      </div>
    </div>
  )
}
