import { useEffect, useState } from 'react'
import ContactsContainer from '../components/contacts-container'
import FiltersContainer from '../components/filters-container'
import MainContainer from '../components/main-container'
import SettingsBar from '../components/settings-bar'
import { axiosInstance } from '../api/axios-instance'

export default function Root() {
  const [user, setUser] = useState({})
  const token = JSON.parse(localStorage.getItem('token'))
  let navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }

    const verifyUser = async () => {
      await axiosInstance
        .get('/verify')
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err))
    }

    verifyUser()
  }, [token, navigate])

  return (
    <MainContainer>
      <SettingsBar />
      <FiltersContainer />
      <ContactsContainer />
      <ChatWindow />
    </MainContainer>
  )
}
