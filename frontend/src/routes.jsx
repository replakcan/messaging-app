import ErrorPage from './routes/error-page'
import LoginPage from './routes/login-page'
import RegisterPage from './routes/register-page'
import ChatWindow from './routes/chat-window'
import Root from './routes/root'
import GroupWindow from './routes/group-window'
import IndexWindow from './routes/index-window'

const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <IndexWindow /> },
      {
        path: 'chat/:contactId',
        element: <ChatWindow />,
      },
      {
        path: 'group/:groupId',
        element: <GroupWindow />,
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
]

export default routes
