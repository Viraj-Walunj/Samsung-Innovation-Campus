"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LogOut, PlayCircle } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
import Image from "next/image"

export function DashboardHeader() {
  const { user, logout } = useAuth()

  if (!user) return null

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-border bg-card">
      <div className="flex items-center gap-3">
        <div className="relative w-9 h-9 overflow-hidden rounded-lg">
          <Image
            src="/logo.png"
            alt="PerfoMix Logo"
            fill
            className="object-contain"
          />
        </div>
        <span
          className="text-lg font-bold tracking-tight text-foreground hidden sm:block"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          PerfoMix
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 hidden lg:flex border-primary/30 hover:bg-primary/5 text-primary">
              <PlayCircle className="w-4 h-4" />
              Platform Tour
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl p-1 overflow-hidden bg-card border-border">
            <div className="aspect-video rounded-lg overflow-hidden">
              <video controls autoPlay className="w-full h-full">
                <source src="/Video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary">
          <Avatar className="w-7 h-7">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-foreground leading-none">{user.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
          </div>
        </div>
        <ModeToggle />
        <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-foreground">
          <LogOut className="w-4 h-4" />
          <span className="sr-only">Logout</span>
        </Button>
      </div>
    </header>
  )
}
