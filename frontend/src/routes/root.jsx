import ContactsContainer from '../components/contacts-container'
import FiltersContainer from '../components/filters-container'
import MainContainer from '../components/main-container'
import SettingsBar from '../components/settings-bar'
import { Outlet } from 'react-router'

export default function Root() {
  return (
    <MainContainer>
      <SettingsBar />
      <FiltersContainer />
      <ContactsContainer />
      <div className="outlet-container">
        <Outlet />
      </div>
    </MainContainer>
  )
}
