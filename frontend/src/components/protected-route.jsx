import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../api/axios-instance'
import AuthContext from '../contexts/auth-context'

export default function ProtectedRoute({ children }) {
  const [authChecked, setAuthChecked] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const verifyToken = async () => {
      const token = JSON.parse(localStorage.getItem('token'))

      if (!token) {
        navigate('/login', { replace: true })
        return
      }

      try {
        const res = await axiosInstance.get('/verify')
        setUser(res.data)
      } catch (error) {
        localStorage.removeItem('token')
        navigate('/login', { replace: true })
      } finally {
        setAuthChecked(true)
      }
    }

    verifyToken()
  }, [navigate])

  if (!authChecked) return null

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}
