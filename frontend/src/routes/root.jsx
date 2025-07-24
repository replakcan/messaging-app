import ChatWindow from '../components/chat-window'
import ContactsContainer from '../components/contacts-container'
import FiltersContainer from '../components/filters-container'
import MainContainer from '../components/main-container'
import SettingsBar from '../components/settings-bar'

export default function Root() {
  return (
    <MainContainer>
      <SettingsBar />
      <FiltersContainer />
      <ContactsContainer />
      <ChatWindow />
    </MainContainer>
  )
}
