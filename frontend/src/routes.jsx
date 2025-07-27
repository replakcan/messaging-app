import ErrorPage from './routes/error-page'
import LoginPage from './routes/login-page'
import RegisterPage from './routes/register-page'
import ChatWindow from './routes/chat-window'
import Root from './routes/root'
import GroupWindow from './routes/group-window'
import IndexWindow from './routes/index-window'
import GroupInfo from './routes/group-info'
import ChatterInfo from './routes/chatter-info'
import ProtectedRoute from './components/protected-route'

const routes = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <IndexWindow /> },
      {
        path: 'chat/:receiverId',
        element: <ChatWindow />,
      },
      {
        path: 'group/:groupId',
        element: <GroupWindow />,
      },
      {
        path: 'group/:groupId/info',
        element: <GroupInfo />,
      },
      {
        path: 'chat/:receiverId/info',
        element: <ChatterInfo />,
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
