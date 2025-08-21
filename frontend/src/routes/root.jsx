import { useEffect } from 'react'
import ContactsContainer from '../components/contacts-container'
import FiltersContainer from '../components/filters-container'
import MainContainer from '../components/main-container'
import SettingsBar from '../components/settings-bar'
import { Outlet } from 'react-router'
import { axiosInstance } from '../api/axios-instance'
import UserContext from '../contexts/user-context'
import { useReducer } from 'react'
import { ACTIONS, initialState, userReducer } from '../reducers/user-reducer'

export default function Root() {
  const [state, dispatch] = useReducer(userReducer, initialState)

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [userRes, contactsRes, conversationsRes, groupsRes] =
          await Promise.all([
            axiosInstance.get('/verify'),
            axiosInstance.get('/contacts'),
            axiosInstance.get('/auth/me/conversations'),
            axiosInstance.get('/groups'),
          ])

        dispatch({
          type: ACTIONS.SET_INITIAL_DATA,
          payload: {
            user: userRes.data,
            contacts: contactsRes.data,
            conversations: conversationsRes.data,
            groups: groupsRes.data,
          },
        })
      } catch (err) {
        console.log(err)
        localStorage.removeItem('token')
      }
    }

    fetchAllData()
  }, [])

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <MainContainer>
        <SettingsBar />
        <ContactsContainer />
        <FiltersContainer />
        <div className="outlet-container">
          <Outlet />
        </div>
      </MainContainer>
    </UserContext.Provider>
  )
}
