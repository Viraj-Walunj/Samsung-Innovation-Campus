"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { loginUser } from "@/lib/api"
import type { UserRole } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, BookOpen, Loader2, ArrowLeft } from "lucide-react"
import Image from "next/image"

import { ModeToggle } from "@/components/mode-toggle"
import { signIn } from "next-auth/react"

export function LoginPage({ onBack }: { onBack?: () => void }) {
  const { login } = useAuth()
  const [role, setRole] = useState<UserRole>("student")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGoogleSignIn = () => {
    signIn("google")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const user = await loginUser(email, password, role)
      if (user) {
        login(user)
      } else {
        setError("Invalid email or role. Note: All student/teacher emails use the password 'demo123'")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const fillDemo = (type: UserRole) => {
    if (type === "student") {
      setEmail("student@demo.edu")
      setRole("student")
    } else {
      setEmail("rajesh@teacher.edu")
      setRole("teacher")
    }
    setPassword("demo123")
  }

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      {/* Clean Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 z-0" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 z-0 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-border bg-card/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-white/20 p-1">
            <Image
              src="/logo.png"
              alt="PerfoMix Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            PerfoMix
          </span>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-500">
          <Card className="border-border bg-card shadow-2xl shadow-primary/5">
            <CardHeader className="pb-4 text-center">
              <CardTitle className="text-3xl text-card-foreground" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Welcome Back
              </CardTitle>
              <CardDescription>Choose your role and enter your credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={role} onValueChange={(v) => { setRole(v as UserRole); setError("") }}>
                <TabsList className="w-full mb-6 grid grid-cols-2">
                  <TabsTrigger value="student" className="flex items-center justify-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Student
                  </TabsTrigger>
                  <TabsTrigger value="teacher" className="flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Teacher
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={role}>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email" className="text-foreground">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={role === "student" ? "student@demo.edu" : "rajesh@teacher.edu"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="password" className="text-foreground">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md font-medium">{error}</p>
                    )}

                    <Button type="submit" disabled={loading} className="w-full mt-4 h-11 text-base font-bold rounded-xl shadow-lg hover:shadow-primary/25 transition-all">
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="relative my-6 px-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-3 text-muted-foreground font-medium">Or continue with</span>
                </div>
              </div>

              <Button
                variant="outline"
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full h-11 rounded-xl border-border bg-background hover:bg-secondary/20 transition-colors flex items-center justify-center gap-3 font-medium text-foreground"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="mt-8 pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-4 text-center">Quick demo access:</p>
                <div className="flex gap-3">
                  <Button variant="outline" type="button" onClick={() => fillDemo("student")} className="flex-1 rounded-xl bg-background/50 hover:bg-secondary/40 h-10 text-xs">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Student Demo
                  </Button>
                  <Button variant="outline" type="button" onClick={() => fillDemo("teacher")} className="flex-1 rounded-xl bg-background/50 hover:bg-secondary/40 h-10 text-xs">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Teacher Demo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-4 border-t border-border bg-card/50 backdrop-blur-md text-center">
        <p className="text-xs text-muted-foreground">
          Built for Hackathon 2026 &middot; PerfoMix
        </p>
      </footer>
    </div>
  )
}
