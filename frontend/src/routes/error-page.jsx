import { NavLink, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <div>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <NavLink to="/">Go Back To Home Page</NavLink>
      </div>
    </div>
  )
}
