import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './reset.css'
import './styles/root.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import routes from './routes'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
