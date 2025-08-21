import { useEffect, useState } from 'react'
import { axiosInstance } from '../api/axios-instance'
import useLocalStorage from '../hooks/useLocalStorage'
import { useNavigate } from 'react-router'

export default function LoginPage() {
  const [token, setToken] = useLocalStorage('token', null)
  const [formData, setFormData] = useState({ username: '', password: '' })
  let navigate = useNavigate()

  useEffect(() => {
    if (token) navigate('/')
  }, [token, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axiosInstance
      .post('/login', formData)
      .then((res) => setToken(res.data.token))
      .catch((err) => console.log(err))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Phone:</label>
      <input
        onChange={handleChange}
        type="text"
        name="username"
        id="username"
        value={formData.username}
        autoComplete="username"
      />

      <label htmlFor="password">Password:</label>
      <input
        onChange={handleChange}
        type="password"
        name="password"
        id="password"
        value={formData.password}
        autoComplete="current-password"
      />

      <button type="submit">Login</button>
    </form>
  )
}
