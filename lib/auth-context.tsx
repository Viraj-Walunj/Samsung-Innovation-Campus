"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useSession, signOut as nextAuthSignOut } from "next-auth/react"
import type { User, UserRole } from "@/lib/data"

interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      // Map Google session user to our internal User type
      const mappedUser: User = {
        id: (session.user as any).id || "s_google",
        name: session.user.name || "Unknown",
        email: session.user.email || "",
        role: (session.user as any).role || "student",
        avatar: session.user.image || undefined,
        department: (session.user as any).department,
        rollNumber: (session.user as any).rollNumber,
      }
      setUser(mappedUser)
    } else if (status === "unauthenticated") {
      // Session ended or user signed out via Google
      setUser(null)
    }
  }, [session, status])

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = async () => {
    setUser(null)
    if (status === "authenticated") {
      await nextAuthSignOut({ redirect: false })
      window.location.href = "/" // Clear state and redirect
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
