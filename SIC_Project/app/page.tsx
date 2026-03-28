"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useSession } from "next-auth/react"
import { HomePage } from "@/components/home-page"
import { LoginPage } from "@/components/login-page"
import { StudentDashboard } from "@/components/student-dashboard"
import { TeacherDashboard } from "@/components/teacher-dashboard"
import { Loader2 } from "lucide-react"

function AppContent() {
  const { user, isAuthenticated } = useAuth()
  const { status } = useSession()
  const [showLogin, setShowLogin] = useState(false)

  // While NextAuth is loading the session, show a spinner
  // This prevents the home page from flashing after Google OAuth redirect
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading your session...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    if (showLogin) {
      return <LoginPage onBack={() => setShowLogin(false)} />
    }
    return <HomePage onLoginClick={() => setShowLogin(true)} />
  }

  if (user.role === "student") {
    return <StudentDashboard />
  }

  return <TeacherDashboard />
}

export default function Home() {
  // NOTE: AuthProvider is already provided in layout.tsx
  // Do NOT wrap here again — that creates a duplicate context that shadows the one with session data
  return <AppContent />
}
