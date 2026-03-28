"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { studentAttendance, studentMarks, subjects, allStudentPerformance, type MarksRecord } from "@/lib/data"
import { useAuth } from "@/lib/auth-context"
import { DashboardHeader } from "@/components/dashboard-header"
import {
  BookOpen,
  GraduationCap,
  TrendingUp,
  CalendarCheck,
  Award,
  AlertTriangle,
  FileText,
  Briefcase,
  Sparkles,
  BrainCircuit,
  CheckCircle2,
  Download,
  Loader2,
  Eye,
} from "lucide-react"
import { generateStudentSummaryPDF } from "@/lib/pdf-generator"

const CHART_COLORS = [
  "oklch(0.46 0.17 264)", // Logo Blue
  "oklch(0.67 0.16 164)", // Logo Green
  "oklch(0.70 0.18 50)",  // Red/Orange
  "oklch(0.65 0.20 330)", // Pink/Purple
  "oklch(0.75 0.15 85)",  // Yellow
]

function getGrade(percentage: number) {
  if (percentage >= 90) return { grade: "A+", color: "text-primary" }
  if (percentage >= 80) return { grade: "A", color: "text-chart-1" }
  if (percentage >= 70) return { grade: "B+", color: "text-chart-5" }
  if (percentage >= 60) return { grade: "B", color: "text-chart-2" }
  if (percentage >= 50) return { grade: "C", color: "text-chart-3" }
  return { grade: "D", color: "text-destructive" }
}

function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
  trend,
}: {
  icon: React.ElementType
  label: string
  value: string
  subtext?: string
  trend?: "up" | "down" | "neutral"
}) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="flex items-start gap-4 p-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold text-foreground mt-0.5" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            {value}
          </p>
          {subtext && (
            <p className={`text-xs mt-1 ${trend === "up" ? "text-primary" : trend === "down" ? "text-destructive" : "text-muted-foreground"
              }`}>
              {subtext}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// ---- Quizzes Section ----
function QuizzesSection() {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const pendingQuizzes = [
    { id: "q1", subject: "Machine Learning", title: "Unit 2: Neural Networks Foundations", duration: "30 Min", marks: 20 },
    { id: "q2", subject: "Operating Systems", title: "Process Scheduling Readiness Quiz", duration: "20 Min", marks: 15 },
  ]

  const completedQuizzes = [
    { id: "q3", subject: "Data Structures", title: "Trees & Graphs Assessment", scored: 17, total: 20, date: "2025-09-15" },
    { id: "q4", subject: "Database Management", title: "SQL Basics Quiz", scored: 18, total: 20, date: "2025-09-20" },
  ]

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setActiveQuiz(null)
    }, 2000)
  }

  if (activeQuiz) {
    const quiz = pendingQuizzes.find(q => q.id === activeQuiz)
    return (
      <Card className="bg-card border-border shadow-2xl animate-in fade-in slide-in-from-bottom-4">
        <CardHeader className="border-b border-border bg-primary/5 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-foreground mb-1">{quiz?.title}</CardTitle>
              <p className="text-sm text-primary font-medium">{quiz?.subject}</p>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="text-xs bg-background">{quiz?.duration}</Badge>
              <p className="text-xs text-muted-foreground mt-1">{quiz?.marks} Marks Total</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-8">
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-border/50 bg-secondary/20 space-y-3">
              <p className="font-medium text-sm text-foreground">1. What is the primary function of an activation function in a neural network?</p>
              <div className="space-y-2">
                {["To increase training time", "To introduce non-linearity", "To initialize weights", "To normalize input data"].map((opt, i) => (
                  <label key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border/30 hover:bg-secondary/40 cursor-pointer transition-colors bg-background">
                    <input type="radio" name="q1" className="w-4 h-4 text-primary accent-primary" />
                    <span className="text-sm text-foreground/80">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border/50 bg-secondary/20 space-y-3">
              <p className="font-medium text-sm text-foreground">2. Which algorithm is best for preventing vanishing gradients?</p>
              <div className="space-y-2">
                {["Sigmoid", "Tanh", "ReLU", "Softmax"].map((opt, i) => (
                  <label key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border/30 hover:bg-secondary/40 cursor-pointer transition-colors bg-background">
                    <input type="radio" name="q2" className="w-4 h-4 text-primary accent-primary" />
                    <span className="text-sm text-foreground/80">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <Button variant="outline" onClick={() => setActiveQuiz(null)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={submitted}>
              {submitted ? (
                <><CheckCircle2 className="w-4 h-4 mr-2" /> Submitted</>
              ) : (
                "Submit Quiz"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="bg-card border-border">
        <CardHeader className="pb-3 border-b border-border/50">
          <CardTitle className="text-base text-foreground flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-primary" />
            Pending Quizzes
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          {pendingQuizzes.map(q => (
            <div key={q.id} className="p-4 rounded-xl border border-border/50 bg-secondary/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h4 className="font-medium text-foreground text-sm">{q.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{q.subject} • {q.marks} Marks • {q.duration}</p>
              </div>
              <Button size="sm" onClick={() => setActiveQuiz(q.id)} className="shrink-0 w-full md:w-auto self-start md:self-auto">
                Start Quiz
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-3 border-b border-border/50">
          <CardTitle className="text-base text-foreground flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            Completed Quizzes
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          {completedQuizzes.map(q => (
            <div key={q.id} className="p-4 rounded-xl border border-border/50 bg-secondary/10 flex items-center justify-between gap-4">
              <div>
                <h4 className="font-medium text-foreground text-sm">{q.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{q.subject} • {q.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary">{q.scored} / {q.total}</p>
                <p className="text-xs text-muted-foreground">Score</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

import { getStudentDynamicData } from "@/lib/utils-data"

export function StudentDashboard() {
  const { user } = useAuth()
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  // --- Personalized Data Engine ---
  // Pull from the unique performance record for this student
  const studentInfo = allStudentPerformance.find(p => p.id === user?.id) || allStudentPerformance[0]

  const { dynamicAttendance, dynamicMarks } = getStudentDynamicData(user?.id || "s1")

  // Recalculate stats for the dashboard
  const overallAttendance = studentInfo.avgAttendance
  const overallMarksPercentage = studentInfo.avgMarks
  const overallGrade = studentInfo.grade

  const lowAttendanceSubjects = dynamicAttendance.filter((s) => s.percentage < 75)
  const totalSubjects = dynamicAttendance.length

  // Prepare marks data for bar chart
  const marksBySubject = subjects.map((sub) => {
    const subMarks = dynamicMarks.filter((m) => m.subjectId === sub.id)
    return {
      subject: sub.name.length > 12 ? sub.name.slice(0, 12) + "..." : sub.name,
      fullName: sub.name,
      Quiz: Math.round((subMarks.find(m => m.examType === "quiz")?.obtainedMarks || 0) / 20 * 100),
      Midterm: Math.round((subMarks.find(m => m.examType === "midterm")?.obtainedMarks || 0) / 50 * 100),
      Final: Math.round((subMarks.find(m => m.examType === "final")?.obtainedMarks || 0) / 100 * 100),
      Assignment: Math.round((subMarks.find(m => m.examType === "assignment")?.obtainedMarks || 0) / 20 * 100),
    }
  })

  // Radar chart data
  const radarData = dynamicAttendance.map((att) => {
    const finalM = dynamicMarks.find(m => m.subjectId === att.subjectId && m.examType === "final")
    return {
      subject: att.subjectName.split(" ")[0],
      fullName: att.subjectName,
      Attendance: att.percentage,
      Marks: finalM ? Math.round(finalM.obtainedMarks / finalM.maxMarks * 100) : 0,
    }
  })

  // Performance pie chart
  const finalExamMarks = dynamicMarks.filter((m) => m.examType === "final")
  const performanceSegments = [
    { name: "Excellent (90+)", value: finalExamMarks.filter((m) => (m.obtainedMarks / m.maxMarks) * 100 >= 90).length },
    { name: "Good (70-89)", value: finalExamMarks.filter((m) => { const p = (m.obtainedMarks / m.maxMarks) * 100; return p >= 70 && p < 90 }).length },
    { name: "Average (50-69)", value: finalExamMarks.filter((m) => { const p = (m.obtainedMarks / m.maxMarks) * 100; return p >= 50 && p < 70 }).length },
    { name: "Below Avg (<50)", value: finalExamMarks.filter((m) => (m.obtainedMarks / m.maxMarks) * 100 < 50).length },
  ].filter((s) => s.value > 0)

  // AI Career insights
  const strongSubjects = marksBySubject.filter((m) => m.Final >= 75).map((m) => m.fullName)
  const suggestedRoles = new Set<string>()
  if (strongSubjects.includes("Data Structures")) { suggestedRoles.add("Software Engineer"); suggestedRoles.add("SDE Analyst") }
  if (strongSubjects.includes("Machine Learning")) { suggestedRoles.add("Machine Learning Engineer"); suggestedRoles.add("Data Scientist") }
  if (strongSubjects.includes("Database Management")) { suggestedRoles.add("Backend Engineer"); suggestedRoles.add("Data Engineer") }
  if (strongSubjects.includes("Computer Networks")) { suggestedRoles.add("DevOps Engineer"); suggestedRoles.add("Network Administrator") }
  if (strongSubjects.includes("Operating Systems")) { suggestedRoles.add("Systems Programmer") }

  if (suggestedRoles.size === 0) {
    suggestedRoles.add("Junior Developer")
    suggestedRoles.add("IT Associate")
  }
  const suggestedRolesList = Array.from(suggestedRoles).slice(0, 4)

  const handleDownloadPDF = async () => {
    if (!user) return
    setIsGeneratingPDF(true)
    try {
      await generateStudentSummaryPDF(user, dynamicMarks as MarksRecord[], dynamicAttendance, "download")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handlePreviewPDF = async () => {
    if (!user) return
    await generateStudentSummaryPDF(user, dynamicMarks as MarksRecord[], dynamicAttendance, "preview")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border p-6 md:p-8 shadow-sm">
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Hey {user?.name?.split(" ")[0]}, Let's excel!
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-xl">
              Track your progress, monitor attendance, and see how you're performing across all subjects.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                Roll: {user?.rollNumber}
              </div>
              <div className="px-3 py-1 rounded-full bg-secondary border border-border text-muted-foreground text-xs font-medium">
                {user?.department}
              </div>
              <div className="flex flex-wrap gap-2 ml-auto">
                <Button
                  onClick={handlePreviewPDF}
                  variant="outline"
                  size="sm"
                  className="bg-secondary/20 hover:bg-secondary border-border text-foreground"
                >
                  <Eye className="w-4 h-4 mr-2" /> Preview Report
                </Button>
                <Button
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF}
                  variant="outline"
                  size="sm"
                  className="bg-primary/10 hover:bg-primary/20 border-primary/30 text-primary"
                >
                  {isGeneratingPDF ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
                  ) : (
                    <><Download className="w-4 h-4 mr-2" /> Download Report</>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Decorative Video */}
          <div className="absolute top-0 right-0 bottom-0 w-1/2 opacity-10 hidden lg:block">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/Video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-l from-card via-transparent to-transparent" />
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={CalendarCheck}
            label="Attendance"
            value={`${overallAttendance}%`}
            subtext={overallAttendance >= 75 ? "Above minimum" : "Below 75% threshold"}
            trend={overallAttendance >= 75 ? "up" : "down"}
          />
          <StatCard
            icon={Award}
            label="Grade"
            value={overallGrade}
            subtext={`${overallMarksPercentage}% overall`}
            trend="neutral"
          />
          <StatCard
            icon={BookOpen}
            label="Subjects"
            value={`${totalSubjects}`}
            subtext={`${lowAttendanceSubjects.length} need attention`}
            trend={lowAttendanceSubjects.length > 0 ? "down" : "up"}
          />
          <StatCard
            icon={TrendingUp}
            label="Best Subject"
            value={marksBySubject.reduce((prev, current) => (prev.Final > current.Final) ? prev : current).subject}
            subtext={`${Math.max(...marksBySubject.map(m => m.Final))}% in final`}
            trend="up"
          />
        </div>

        {/* Low attendance warning */}
        {lowAttendanceSubjects.length > 0 && (
          <Card className="bg-destructive/5 border-destructive/20 mb-6">
            <CardContent className="flex items-center gap-3 p-4">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Attendance Warning</p>
                <p className="text-xs text-muted-foreground">
                  {lowAttendanceSubjects.map((s) => s.subjectName).join(", ")} - below 75% threshold
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="attendance" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="marks">Marks</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="resume" className="text-primary data-[state=active]:bg-primary/10">
              <Sparkles className="w-4 h-4 mr-2" />
              Resume AI
            </TabsTrigger>
          </TabsList>

          {/* ATTENDANCE TAB */}
          <TabsContent value="attendance">
            <div className="grid lg:grid-cols-5 gap-4">
              {/* Attendance bars */}
              <Card className="lg:col-span-3 bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-card-foreground">Subject-wise Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dynamicAttendance.map((a) => ({ ...a, name: a.subjectName.split(" ")[0] }))}>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.26 0.012 260)" />
                        <XAxis dataKey="name" tick={{ fill: "oklch(0.60 0.01 260)", fontSize: 12 }} />
                        <YAxis domain={[0, 100]} tick={{ fill: "oklch(0.60 0.01 260)", fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "oklch(0.17 0.008 260)", border: "1px solid oklch(0.26 0.012 260)", borderRadius: 8, color: "oklch(0.93 0.005 260)" }}
                          labelStyle={{ color: "oklch(0.93 0.005 260)" }}
                        />
                        <Bar dataKey="percentage" name="Attendance %">
                          {dynamicAttendance.map((entry, i) => (
                            <Cell
                              key={`cell-${i}`}
                              fill={entry.percentage >= 75 ? "oklch(0.72 0.17 165)" : "oklch(0.55 0.22 27)"}
                              radius={[4, 4, 0, 0] as unknown as number}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Attendance details */}
              <Card className="lg:col-span-2 bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-card-foreground">Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    {dynamicAttendance.map((att) => (
                      <div key={att.subjectId}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-foreground font-medium">{att.subjectName}</span>
                          <Badge
                            variant={att.percentage >= 75 ? "default" : "destructive"}
                          >
                            {att.percentage}%
                          </Badge>
                        </div>
                        <Progress value={att.percentage} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {att.attended} / {att.total} lectures
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* MARKS TAB */}
          <TabsContent value="marks">
            <div className="grid lg:grid-cols-5 gap-4">
              {/* Marks bar chart */}
              <Card className="lg:col-span-3 bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-card-foreground">Marks by Subject (% scored)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={marksBySubject}>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.26 0.012 260)" />
                        <XAxis dataKey="subject" tick={{ fill: "oklch(0.60 0.01 260)", fontSize: 11 }} />
                        <YAxis domain={[0, 100]} tick={{ fill: "oklch(0.60 0.01 260)", fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "oklch(0.17 0.008 260)", border: "1px solid oklch(0.26 0.012 260)", borderRadius: 8, color: "oklch(0.93 0.005 260)" }}
                          labelStyle={{ color: "oklch(0.93 0.005 260)" }}
                        />
                        <Legend wrapperStyle={{ color: "oklch(0.60 0.01 260)", fontSize: 12 }} />
                        <Bar dataKey="Quiz" fill={CHART_COLORS[0]} radius={[2, 2, 0, 0]} />
                        <Bar dataKey="Midterm" fill={CHART_COLORS[1]} radius={[2, 2, 0, 0]} />
                        <Bar dataKey="Final" fill={CHART_COLORS[2]} radius={[2, 2, 0, 0]} />
                        <Bar dataKey="Assignment" fill={CHART_COLORS[3]} radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Marks table */}
              <Card className="lg:col-span-2 bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-card-foreground">Final Exam Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead className="text-muted-foreground">Subject</TableHead>
                        <TableHead className="text-muted-foreground text-right">Score</TableHead>
                        <TableHead className="text-muted-foreground text-right">Grade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dynamicMarks.filter(m => m.examType === "final").map((m) => {
                        const sub = subjects.find((s) => s.id === m.subjectId)
                        const pct = Math.round((m.obtainedMarks / m.maxMarks) * 100)
                        const { grade, color } = getGrade(pct)
                        return (
                          <TableRow key={m.subjectId} className="border-border">
                            <TableCell className="text-foreground text-sm">{sub?.name}</TableCell>
                            <TableCell className="text-foreground text-sm text-right">
                              {m.obtainedMarks}/{m.maxMarks}
                            </TableCell>
                            <TableCell className={`text-sm text-right font-bold ${color}`}>
                              {grade}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* QUIZZES TAB */}
          <TabsContent value="quizzes">
            <QuizzesSection />
          </TabsContent>

          {/* ANALYSIS TAB */}
          <TabsContent value="analysis">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Radar chart */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-card-foreground">Attendance vs Marks Radar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="oklch(0.26 0.012 260)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: "oklch(0.60 0.01 260)", fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "oklch(0.60 0.01 260)", fontSize: 10 }} />
                        <Radar name="Attendance" dataKey="Attendance" stroke={CHART_COLORS[0]} fill={CHART_COLORS[0]} fillOpacity={0.2} />
                        <Radar name="Marks" dataKey="Marks" stroke={CHART_COLORS[1]} fill={CHART_COLORS[1]} fillOpacity={0.2} />
                        <Legend wrapperStyle={{ color: "oklch(0.60 0.01 260)", fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "oklch(0.17 0.008 260)", border: "1px solid oklch(0.26 0.012 260)", borderRadius: 8, color: "oklch(0.93 0.005 260)" }}
                          labelStyle={{ color: "oklch(0.93 0.005 260)" }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Performance distribution pie */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-card-foreground">Performance Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={performanceSegments}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={90}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                          labelLine={{ stroke: "oklch(0.60 0.01 260)" }}
                        >
                          {performanceSegments.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: "oklch(0.17 0.008 260)", border: "1px solid oklch(0.26 0.012 260)", borderRadius: 8, color: "oklch(0.93 0.005 260)" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Trend line chart */}
              <Card className="md:col-span-2 bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-card-foreground">Exam Performance Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          {
                            exam: "Quiz", ...Object.fromEntries(subjects.map((s) => {
                              const m = dynamicMarks.find((mk) => mk.subjectId === s.id && mk.examType === "quiz")
                              return [s.name.split(" ")[0], m ? Math.round((m.obtainedMarks / m.maxMarks) * 100) : 0]
                            }))
                          },
                          {
                            exam: "Midterm", ...Object.fromEntries(subjects.map((s) => {
                              const m = dynamicMarks.find((mk) => mk.subjectId === s.id && mk.examType === "midterm")
                              return [s.name.split(" ")[0], m ? Math.round((m.obtainedMarks / m.maxMarks) * 100) : 0]
                            }))
                          },
                          {
                            exam: "Assignment", ...Object.fromEntries(subjects.map((s) => {
                              const m = dynamicMarks.find((mk) => mk.subjectId === s.id && mk.examType === "assignment")
                              return [s.name.split(" ")[0], m ? Math.round((m.obtainedMarks / m.maxMarks) * 100) : 0]
                            }))
                          },
                          {
                            exam: "Final", ...Object.fromEntries(subjects.map((s) => {
                              const m = dynamicMarks.find((mk) => mk.subjectId === s.id && mk.examType === "final")
                              return [s.name.split(" ")[0], m ? Math.round((m.obtainedMarks / m.maxMarks) * 100) : 0]
                            }))
                          },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.26 0.012 260)" />
                        <XAxis dataKey="exam" tick={{ fill: "oklch(0.60 0.01 260)", fontSize: 12 }} />
                        <YAxis domain={[0, 100]} tick={{ fill: "oklch(0.60 0.01 260)", fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "oklch(0.17 0.008 260)", border: "1px solid oklch(0.26 0.012 260)", borderRadius: 8, color: "oklch(0.93 0.005 260)" }}
                          labelStyle={{ color: "oklch(0.93 0.005 260)" }}
                        />
                        <Legend wrapperStyle={{ color: "oklch(0.60 0.01 260)", fontSize: 12 }} />
                        {subjects.map((s, i) => (
                          <Line
                            key={s.id}
                            type="monotone"
                            dataKey={s.name.split(" ")[0]}
                            stroke={CHART_COLORS[i]}
                            strokeWidth={2}
                            dot={{ fill: CHART_COLORS[i], r: 4 }}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI RESUME PREDICTION TAB */}
          <TabsContent value="resume">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column: AI Career Insights */}
              <div className="flex flex-col gap-6">
                <Card className="bg-card border-border shadow-lg shadow-primary/5">
                  <CardHeader className="pb-3 bg-primary/5 border-b border-border/50">
                    <CardTitle className="text-lg text-foreground flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      Predicted Career Paths
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Based on your excellent performance in {strongSubjects.slice(0, 2).join(" and ")}, our AI predicts you would excel in the following roles:
                    </p>
                    <div className="flex flex-col gap-3">
                      {suggestedRolesList.map((role, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border/50">
                          <span className="font-medium text-foreground">{role}</span>
                          <Badge variant="outline" className="text-xs text-primary bg-primary/5 border-primary/20">High Match</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border shadow-lg shadow-primary/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-foreground">Analytics Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Overall Academic Score</span>
                        <span className="font-bold text-foreground text-lg">{overallMarksPercentage}%</span>
                      </div>
                      <Progress value={overallMarksPercentage} className="h-2" />
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-sm text-muted-foreground">Reliability (Attendance)</span>
                        <span className="font-bold text-foreground text-lg">{overallAttendance}%</span>
                      </div>
                      <Progress value={overallAttendance} className="h-2 bg-secondary" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Auto-Generated Resume */}
              <Card className="lg:col-span-2 bg-gradient-to-br from-card to-card/50 border-border shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <FileText className="w-32 h-32" />
                </div>
                <CardHeader className="pb-4 border-b border-border/50 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-foreground font-serif tracking-tight">{user?.name}</CardTitle>
                    <p className="text-primary font-medium mt-1">{suggestedRolesList[0] || "Student"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                    <p className="text-sm text-muted-foreground">{user?.department}</p>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-8">
                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 border-b border-border pb-1">Professional Summary</h3>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      Detail-oriented and high-performing {user?.department} student with a strong academic record ({overallMarksPercentage}% avg).
                      Demonstrated expertise in {strongSubjects.join(", ")}, highlighting a robust foundation for pursuing a career as a {suggestedRolesList[0]}.
                      Highly reliable with a consistent {overallAttendance}% attendance record, signifying strong commitment and professional discipline.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 border-b border-border pb-1">Core Competencies</h3>
                    <div className="flex flex-wrap gap-2">
                      {strongSubjects.map((subject, idx) => (
                        <Badge key={idx} variant="secondary" className="px-3 py-1 font-normal bg-primary/10 text-primary border-primary/20">
                          {subject}
                        </Badge>
                      ))}
                      {overallAttendance > 80 && (
                        <Badge variant="secondary" className="px-3 py-1 font-normal">Punctuality & Reliability</Badge>
                      )}
                      {marksBySubject.some(m => m.Final > 85) && (
                        <Badge variant="secondary" className="px-3 py-1 font-normal">Analytical Problem Solving</Badge>
                      )}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 border-b border-border pb-1">Academic Achievements</h3>
                    <ul className="space-y-2 text-sm text-foreground/90 list-disc list-inside">
                      <li>Achieved an overall grade of <strong>{overallGrade}</strong> in the {user?.department} program.</li>
                      {strongSubjects.map((sub, idx) => (
                        <li key={idx}>Secured top-tier marks in <strong>{sub}</strong>, demonstrating advanced proficiency.</li>
                      ))}
                    </ul>
                  </section>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
