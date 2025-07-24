import ErrorPage from "./routes/error-page"
import Root from "./routes/root"

const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [],
  },
]

export default routes
