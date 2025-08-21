import { EllipsisVertical, MessageSquarePlus } from 'lucide-react'
import '../styles/filters-container.css'
import { useContext } from 'react'
import UserContext from '../contexts/user-context'
import { ACTIONS } from '../reducers/user-reducer'

export default function FiltersContainer() {
  const { state, dispatch } = useContext(UserContext)
  const { activeFilter } = state

  const handleAllClick = () => {
    dispatch({ type: ACTIONS.RESET_FILTERS })
  }

  const handleGroupsClick = () => {
    dispatch({ type: ACTIONS.FILTER_CONTACTS_BY_TYPE, payload: 'group' })
  }

  return (
    <div className="filters-container">
      <header>
        <h3 className="app-name">MesajApp</h3>
        <div className="icon-group">
          <MessageSquarePlus />
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
