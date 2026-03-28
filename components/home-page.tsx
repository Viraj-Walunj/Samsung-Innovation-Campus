"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ModeToggle } from "@/components/mode-toggle"
import { Badge } from "@/components/ui/badge"
import {
    Sparkles,
    ChevronRight,
    TrendingUp,
    GraduationCap,
    BookOpen,
    BarChart3,
    Users
} from "lucide-react"

export function HomePage({ onLoginClick }: { onLoginClick: () => void }) {
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
            {/* Header */}
            <header className="relative z-10 flex items-center justify-between px-6 py-6 border-b border-border/40 backdrop-blur-md bg-background/50">
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-primary/10 p-1.5 border border-primary/20">
                        <Image
                            src="/logo.png"
                            alt="PerfoMix Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div>
                        <span className="text-xl font-bold tracking-tight text-foreground block leading-none" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                            PerfoMix
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">Performance Hub</span>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                        <a href="#" className="hover:text-primary transition-colors">Platform</a>
                        <a href="#" className="hover:text-primary transition-colors">Analytics</a>
                        <a href="#" className="hover:text-primary transition-colors">Resumes</a>
                    </nav>
                    <ModeToggle />
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-20 lg:px-20 max-w-7xl mx-auto w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center w-full">

                    {/* Left side: Text Content */}
                    <div className="flex flex-col space-y-10 text-left">
                        <div className="space-y-6">
                            <Badge variant="outline" className="w-fit py-1 px-4 bg-primary/5 text-primary border-primary/20 rounded-full text-xs font-bold uppercase tracking-wider animate-in fade-in slide-in-from-left-4 duration-700">
                                <Sparkles className="w-3 h-3 mr-2" />
                                Smart Performance Management
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight leading-[1.1]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                                Where Performance <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-primary/80">meets Achievement.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                                Experience a new standard in academic tracking. Our AI-driven platform bridges the gap between raw data and meaningful student success.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                onClick={onLoginClick}
                                size="lg"
                                className="h-16 px-10 text-lg font-bold rounded-2xl shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 bg-primary text-white"
                            >
                                Get Started
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </Button>
                            <Button variant="outline" size="lg" className="h-16 px-10 rounded-2xl border-border/60 hover:bg-secondary/20 transition-all font-semibold">
                                View Demo
                            </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-8 pt-6 border-t border-border/40">
                            <div>
                                <p className="text-3xl font-bold text-foreground">70+</p>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Students Tracked</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-foreground">98%</p>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Accuracy Rate</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-foreground">Real-time</p>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Insights</p>
                            </div>
                        </div>
                    </div>

                    {/* Right side: Minimal Video Integration */}
                    <div className="relative group lg:block hidden animate-in fade-in zoom-in duration-1000">
                        {/* Decorative background blur */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-blue-500/30 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />

                        <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border-8 border-background shadow-2xl bg-muted ring-1 ring-border">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                <source src="/video.mp4" type="video/mp4" />
                            </video>

                            {/* Glass overlay details */}
                            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-3xl bg-background/40 backdrop-blur-xl border border-white/20 dark:border-white/5 flex items-center justify-between shadow-2xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                                        <TrendingUp className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-foreground">Live Tracking</p>
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Active System</p>
                                    </div>
                                </div>
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center overflow-hidden">
                                            <div className="w-full h-full bg-gradient-to-br from-primary/40 to-muted" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 px-10 py-8 border-t border-border/40 text-center flex flex-col md:flex-row items-center justify-between gap-6 bg-background/30 backdrop-blur-sm">
                <p className="text-sm font-medium text-muted-foreground">
                    &copy; 2026 PerfoMix Analytics. All rights reserved.
                </p>
                <div className="flex items-center gap-8">
                    <Badge variant="outline" className="rounded-md font-mono text-[10px]">Build: 0.9.4-Stable</Badge>
                    <div className="flex gap-4">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] uppercase font-bold tracking-tighter text-muted-foreground">Server Operational</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}
