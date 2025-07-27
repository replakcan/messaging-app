import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { axiosInstance } from '../api/axios-instance'
import AuthContext from '../contexts/auth-context'

export default function ProtectedRoute({ children }) {
  const [authChecked, setAuthChecked] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const verifyToken = async () => {
      const token = JSON.parse(localStorage.getItem('token'))

      if (!token) {
        setAuthChecked(true)
        setIsAuthenticated(false)
        return
      }

      try {
        const res = await axiosInstance.get('/verify')
        setUser(res.data)
        setIsAuthenticated(true)
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setAuthChecked(true)
      }
    }

    verifyToken()
  }, [])

  if (!authChecked) return null
  if (!isAuthenticated) return <Navigate to="/login" replace />

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}
