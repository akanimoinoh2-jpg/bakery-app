import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bakery-user')
    return saved ? JSON.parse(saved) : null
  })
  // pending user waiting for verification code
  const [pending, setPending] = useState(null)

  const signIn = (email) => {
    const u = { email, name: email.split('@')[0] }
    localStorage.setItem('bakery-user', JSON.stringify(u))
    setUser(u)
  }

  const signOut = () => {
    localStorage.removeItem('bakery-user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, pending, setPending, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
