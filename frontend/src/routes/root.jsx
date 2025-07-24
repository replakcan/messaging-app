import { Outlet } from 'react-router'

export default function Root() {
  return (
    <>
      <h1>root</h1>
      <Outlet />
    </>
  )
}
