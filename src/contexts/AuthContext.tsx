import { useMemo, useState, type ReactNode } from 'react'
import { AuthContext } from './authContextValue'
import type { User } from '../types'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const value = useMemo(
    () => ({
      user,
      login: (username: string, password: string) => {
        if (password !== '123456' || username.trim().length === 0) return false
        setUser({ username: username.trim() })
        return true
      },
      logout: () => setUser(null),
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
