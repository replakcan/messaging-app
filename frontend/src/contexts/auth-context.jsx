import { createContext } from 'react'

const AuthContext = createContext({
  age: '',
  email: '',
  first_name: '',
  last_name: '',
  status_message: '',
  status: '',
})

export default AuthContext
