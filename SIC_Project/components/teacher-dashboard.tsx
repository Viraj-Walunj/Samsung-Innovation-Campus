"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import {
  lectureAttendanceSummary,
  monthlyAttendanceTrend,
  marksVsAttendance,
  classAverageMarks,
  allStudentPerformance,
  gradeDistribution,
  subjects,
  students,
  type MarksRecord,
  type User,
} from "@/lib/data"
import { getStudentDynamicData } from "@/lib/utils-data"
import { generateStudentSummaryPDF } from "@/lib/pdf-generator"
import { useAuth } from "@/lib/auth-context"
import { DashboardHeader } from "@/components/dashboard-header"
import {
  Users,
  TrendingDown,
  BarChart3,
  CalendarCheck,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Save,
  Eye,
  FileText,
  UploadCloud,
  FilePlus,
  BookMarked,
  BrainCircuit,
  ListChecks,
  Share,
  Download,
  DownloadCloud,
} from "lucide-react"

const CHART_COLORS = [
  "oklch(0.46 0.17 264)", // Logo Blue
  "oklch(0.67 0.16 164)", // Logo Green
  "oklch(0.70 0.18 50)",  // Red/Orange
  "oklch(0.65 0.20 330)", // Pink/Purple
  "oklch(0.75 0.15 85)",  // Yellow
]

function TeacherStatCard({
  icon: Icon,
  label,
  value,
  subtext,
  variant = "default",
}: {
  icon: React.ElementType
  label: string
  value: string
  subtext?: string
  variant?: "default" | "warning" | "success"
}) {
  const iconBg = variant === "warning" ? "bg-destructive/10" : variant === "success" ? "bg-primary/10" : "bg-chart-2/10"
  const iconColor = variant === "warning" ? "text-destructive" : variant === "success" ? "text-primary" : "text-chart-2"

  return (
    <Card className="bg-card border-border">
      <CardContent className="flex items-start gap-4 p-4">
        <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${iconBg} shrink-0`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold text-foreground mt-0.5" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            {value}
          </p>
          {subtext && <p className="text-xs text-muted-foreground mt-1">{subtext}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

// ---- Mark Attendance Component ----
function MarkAttendanceSection() {
  const [selectedSubject, setSelectedSubject] = useState("")
  const [attendanceDate, setAttendanceDate] = useState("")
  const [attendance, setAttendance] = useState<Record<string, boolean>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const toggleAttendance = (studentId: string) => {
    setAttendance((prev) => ({ ...prev, [studentId]: !prev[studentId] }))
  }

  const markAll = (present: boolean) => {
    const updated: Record<string, boolean> = {}
    students.forEach((s) => { updated[s.id] = present })
    setAttendance(updated)
  }

  const handleSave = async () => {
    setSaving(true)
    // TODO: Replace with API call - markAttendance(selectedSubject, attendanceDate, ...)
    await new Promise((r) => setTimeout(r, 800))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const presentCount = Object.values(attendance).filter(Boolean).length

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base text-card-foreground">Mark Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1">
            <Label className="text-foreground text-xs mb-1.5 block">Subject</Label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="bg-secondary border-border text-foreground">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label className="text-foreground text-xs mb-1.5 block">Date</Label>
            <Input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="bg-secondary border-border text-foreground"
            />
          </div>
        </div>

        {selectedSubject && (
          <>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">
                Present: <span className="text-primary font-medium">{presentCount}</span> / {students.length}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => markAll(true)} className="text-xs">
                  All Present
                </Button>
                <Button variant="outline" size="sm" onClick={() => markAll(false)} className="text-xs">
                  All Absent
                </Button>
              </div>
            </div>

            <div className="border border-border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border bg-secondary/50">
                    <TableHead className="text-muted-foreground w-16">Roll</TableHead>
                    <TableHead className="text-muted-foreground">Name</TableHead>
                    <TableHead className="text-muted-foreground text-center w-24">Present</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((s) => (
                    <TableRow key={s.id} className="border-border">
                      <TableCell className="text-foreground text-sm">{s.rollNumber}</TableCell>
                      <TableCell className="text-foreground text-sm">{s.name}</TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={attendance[s.id] ?? false}
                          onCheckedChange={() => toggleAttendance(s.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Button
              onClick={handleSave}
              disabled={saving || !attendanceDate}
              className="w-full mt-4"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : saved ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Saved Successfully
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Attendance
                </>
              )}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

// ---- Enter Marks Component ----
function EnterMarksSection() {
  const [selectedSubject, setSelectedSubject] = useState("")
  const [examType, setExamType] = useState("")
  const [maxMarks, setMaxMarks] = useState("100")
  const [marks, setMarks] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const updateMarks = (studentId: string, value: string) => {
    setMarks((prev) => ({ ...prev, [studentId]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    // TODO: Replace with API call - submitMarks(selectedSubject, examType, ...)
    await new Promise((r) => setTimeout(r, 800))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base text-card-foreground">Enter Marks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div>
            <Label className="text-foreground text-xs mb-1.5 block">Subject</Label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="bg-secondary border-border text-foreground">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-foreground text-xs mb-1.5 block">Exam Type</Label>
            <Select value={examType} onValueChange={setExamType}>
              <SelectTrigger className="bg-secondary border-border text-foreground">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quiz">Quiz</SelectItem>
                <SelectItem value="midterm">Midterm</SelectItem>
                <SelectItem value="final">Final</SelectItem>
                <SelectItem value="assignment">Assignment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-foreground text-xs mb-1.5 block">Max Marks</Label>
            <Input
              type="number"
              value={maxMarks}
              onChange={(e) => setMaxMarks(e.target.value)}
              className="bg-secondary border-border text-foreground"
            />
          </div>
        </div>

        {selectedSubject && examType && (
          <>
            <div className="border border-border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border bg-secondary/50">
                    <TableHead className="text-muted-foreground w-16">Roll</TableHead>
                    <TableHead className="text-muted-foreground">Name</TableHead>
                    <TableHead className="text-muted-foreground text-right w-32">Marks (/{maxMarks})</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((s) => (
                    <TableRow key={s.id} className="border-border">
                      <TableCell className="text-foreground text-sm">{s.rollNumber}</TableCell>
                      <TableCell className="text-foreground text-sm">{s.name}</TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="number"
                          min="0"
                          max={maxMarks}
                          value={marks[s.id] ?? ""}
                          onChange={(e) => updateMarks(s.id, e.target.value)}
                          placeholder="--"
                          className="w-20 ml-auto bg-secondary border-border text-foreground text-right"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full mt-4"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : saved ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Saved Successfully
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Marks
                </>
              )}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

// ---- Add Resource Section ----
function AddResourceSection() {
  const [selectedSubject, setSelectedSubject] = useState("")
  const [resourceType, setResourceType] = useState("assignment")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleUpload = async () => {
    setSaving(true)
    // Simulate API upload
    await new Promise((r) => setTimeout(r, 1200))
    setSaving(false)
    setSaved(true)
    setTitle("")
    setDescription("")
    setDueDate("")
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3 border-b border-border/50">
        <CardTitle className="text-base text-card-foreground flex items-center gap-2">
          <UploadCloud className="w-5 h-5 text-primary" />
          Distribute Course Material
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <Label className="text-foreground text-xs mb-1.5 block">Target Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="bg-secondary border-border text-foreground">
                  <SelectValue placeholder="Select class to distribute to" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((s) => (
                    <SelectItem key={s.id} value={s.id}>{s.name} ({s.code})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-foreground text-xs mb-1.5 block">Material Type</Label>
              <Tabs value={resourceType} onValueChange={setResourceType} className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="assignment" className="text-xs">
                    <FilePlus className="w-3 h-3 mr-1.5" /> Assignment
                  </TabsTrigger>
                  <TabsTrigger value="notes" className="text-xs">
                    <BookMarked className="w-3 h-3 mr-1.5" /> Unit Notes
                  </TabsTrigger>
                  <TabsTrigger value="syllabus" className="text-xs">
                    <FileText className="w-3 h-3 mr-1.5" /> Syllabus
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div>
              <Label className="text-foreground text-xs mb-1.5 block">Title</Label>
              <Input
                placeholder={`E.g. ${resourceType === 'assignment' ? 'Assignment 1: Linked Lists' : resourceType === 'notes' ? 'Unit 3: Sorting Algorithms' : 'Midterm Syllabus'}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-secondary border-border text-foreground"
              />
            </div>

            {resourceType === "assignment" && (
              <div>
                <Label className="text-foreground text-xs mb-1.5 block">Due Date</Label>
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="bg-secondary border-border text-foreground"
                />
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div>
              <Label className="text-foreground text-xs mb-1.5 block">Description / Instructions</Label>
              <Textarea
                placeholder="Add any specific instructions, reading requirements, or guidelines for the students here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-secondary border-border text-foreground min-h-[120px] resize-none"
              />
            </div>

            <div>
              <Label className="text-foreground text-xs mb-1.5 block">Attach File</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-pointer">
                <UploadCloud className="w-8 h-8 text-muted-foreground mb-3" />
                <p className="text-sm font-medium text-foreground mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PDF, PPTX, DOCX, or ZIP (max. 50MB)</p>
                <Input type="file" className="hidden" id="file-upload" />
              </div>
            </div>

            <Button
              onClick={handleUpload}
              disabled={saving || !selectedSubject || !title}
              className="w-full h-11"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Uploading...
                </>
              ) : saved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Successfully Distributed
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4 mr-2" />
                  Distribute to Students
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ---- Manage Quizzes Section ----
function ManageQuizzesSection() {
  const [selectedSubject, setSelectedSubject] = useState("")
  const [quizTitle, setQuizTitle] = useState("")
  const [duration, setDuration] = useState("30")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleCreate = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSaving(false)
    setSaved(true)
    setQuizTitle("")
    setDuration("30")
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3 border-b border-border/50">
        <CardTitle className="text-base text-card-foreground flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-primary" />
          Create New Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <Label className="text-foreground text-xs mb-1.5 block">Target Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="bg-secondary border-border text-foreground">
                  <SelectValue placeholder="Select class to assign quiz" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((s) => (
                    <SelectItem key={s.id} value={s.id}>{s.name} ({s.code})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-foreground text-xs mb-1.5 block">Quiz Title</Label>
              <Input
                placeholder="E.g. Unit 1 Readiness Quiz"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="bg-secondary border-border text-foreground"
              />
            </div>
            <div>
              <Label className="text-foreground text-xs mb-1.5 block">Duration (Minutes)</Label>
              <Input
                type="number"
                placeholder="30"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="bg-secondary border-border text-foreground"
              />
            </div>
          </div>
          <div className="space-y-5 flex flex-col">
            <div className="flex-1 p-6 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center text-center bg-secondary/10 hover:bg-secondary/20 transition-colors">
              <ListChecks className="w-8 h-8 text-muted-foreground mb-3" />
              <p className="text-sm font-medium text-foreground mb-1">Add Questions</p>
              <p className="text-xs text-muted-foreground mb-4 max-w-[250px]">Load from your question bank or create multiple choice questions manually.</p>
              <Button variant="outline" size="sm" className="h-9 text-xs">Manage Questions</Button>
            </div>
            <Button
              onClick={handleCreate}
              disabled={saving || !selectedSubject || !quizTitle}
              className="w-full h-11"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Creating...
                </>
              ) : saved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Quiz Published
                </>
              ) : (
                <>
                  <Share className="w-4 h-4 mr-2" />
                  Publish Quiz to Students
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ---- Analytics Section ----
function AnalyticsSection() {
  const lowAttendance = lectureAttendanceSummary.filter((l) => l.averageAttendance < 70)
  const avgAttendance = Math.round(
    lectureAttendanceSummary.reduce((acc, l) => acc + l.averageAttendance, 0) / lectureAttendanceSummary.length
  )

  return (
    <div className="flex flex-col gap-4">
      {/* Warning for low attendance subjects */}
      {lowAttendance.length > 0 && (
        <Card className="bg-destructive/5 border-destructive/20">
          <CardContent className="flex items-start gap-3 p-4">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Low Attendance Detected</p>
              <p className="text-xs text-muted-foreground mt-1">
                {lowAttendance.map((l) => `${l.subjectName} (${l.averageAttendance}%)`).join(", ")} -
                These subjects have significantly low attendance. Consider investigating root causes.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Marks vs Attendance Scatter */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-card-foreground">Marks vs Attendance Correlation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.26 0.012 260)" />
                <XAxis
                  type="number"
                  dataKey="attendance"
                  name="Attendance %"
                  domain={[30, 100]}
                  tick={{ fill: "oklch(0.60 0.01 260)", fontSize: 12 }}
                  label={{ value: "Attendance %", position: "bottom", offset: 5, fill: "oklch(0.60 0.01 260)", fontSize: 12 }}
                />
                <YAxis
                  type="number"
                  dataKey="marks"
                  name="Marks %"
                  domain={[30, 100]}
                  tick={{ fill: "oklch(0.60 0.01 260)", fontSize: 12 }}
                  label={{ value: "Marks %", angle: -90, position: "insideLeft", offset: 10, fill: "oklch(0.60 0.01 260)", fontSize: 12 }}
                />
                <ZAxis range={[60, 60]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "oklch(0.17 0.008 260)", border: "1px solid oklch(0.26 0.012 260)", borderRadius: 8, color: "oklch(0.93 0.005 260)" }}
                  formatter={(value: number, name: string) => [`${value}%`, name]}
                  labelFormatter={(_, payload) => {
                    if (payload && payload.length > 0) {
                      const p = payload[0]?.payload
                      return `${p?.studentName} - ${p?.subject}`
                    }
                    return ""
                  }}
                />
                <Scatter
                  data={marksVsAttendance.filter((d) => d.subject === "Data Structures")}
                  name="Data Structures"
                  fill={CHART_COLORS[0]}
                />
                <Scatter
                  data={marksVsAttendance.filter((d) => d.subject === "Operating Systems")}
                  name="Operating Systems"
                  fill={CHART_COLORS[1]}
                />
                <Legend wrapperStyle={{ color: "oklch(0.60 0.01 260)", fontSize: 12 }} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Strong positive correlation: students with higher attendance tend to score better marks.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Average Marks by Subject */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-card-foreground">Class Average Marks by Exam</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classAverageMarks.map((c) => ({ ...c, subject: c.subject.split(" ")[0] }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.26 0.012 260)" />
                  <XAxis dataKey="subject" tick={{ fill: "oklch(0.60 0.01 260)", fontSize: 11 }} />
                  <YAxis tick={{ fill: "oklch(0.60 0.01 260)", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "oklch(0.17 0.008 260)", border: "1px solid oklch(0.26 0.012 260)", borderRadius: 8, color: "oklch(0.93 0.005 260)" }}
                    labelStyle={{ color: "oklch(0.93 0.005 260)" }}
                  />
                  <Legend wrapperStyle={{ color: "oklch(0.60 0.01 260)", fontSize: 11 }} />
                  <Bar dataKey="quiz" name="Quiz (20)" fill={CHART_COLORS[0]} radius={[2, 2, 0, 0]} />
                  <Bar dataKey="midterm" name="Midterm (50)" fill={CHART_COLORS[1]} radius={[2, 2, 0, 0]} />
                  <Bar dataKey="final" name="Final (100)" fill={CHART_COLORS[2]} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Grade Distribution Pie */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-card-foreground">Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={85}
                    dataKey="count"
                    nameKey="grade"
                    label={({ grade, count }) => `${grade}: ${count}`}
                    labelLine={{ stroke: "oklch(0.60 0.01 260)" }}
                  >
                    {gradeDistribution.map((_, index) => (
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
      </div>

      {/* Monthly attendance trend */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-card-foreground">Monthly Attendance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyAttendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.26 0.012 260)" />
                <XAxis dataKey="month" tick={{ fill: "oklch(0.60 0.01 260)", fontSize: 12 }} />
                <YAxis domain={[50, 100]} tick={{ fill: "oklch(0.60 0.01 260)", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "oklch(0.17 0.008 260)", border: "1px solid oklch(0.26 0.012 260)", borderRadius: 8, color: "oklch(0.93 0.005 260)" }}
                  labelStyle={{ color: "oklch(0.93 0.005 260)" }}
                />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke={CHART_COLORS[0]}
                  strokeWidth={2}
                  dot={{ fill: CHART_COLORS[0], r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Attendance has been declining since October. End-of-semester dip is typical but the Nov-Dec drop is concerning.
          </p>
        </CardContent>
      </Card>

      {/* Subject-wise attendance comparison */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-card-foreground">Subject-wise Average Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {lectureAttendanceSummary
              .sort((a, b) => a.averageAttendance - b.averageAttendance)
              .map((l) => (
                <div key={l.subjectId}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-foreground font-medium">{l.subjectName}</span>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={l.averageAttendance >= 70 ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {l.averageAttendance}%
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {l.lecturesTaken}/{l.totalLectures} lec
                      </span>
                    </div>
                  </div>
                  <Progress value={l.averageAttendance} className="h-2" />
                </div>
              ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Average across all subjects: {avgAttendance}%. Computer Networks needs immediate attention.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

// ---- Student Performance Table ----
function StudentPerformanceTable() {
  const [selectedStudent, setSelectedStudent] = useState<typeof allStudentPerformance[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [isDownloadingAll, setIsDownloadingAll] = useState(false)

  const openAnalytics = (student: typeof allStudentPerformance[0]) => {
    setSelectedStudent(student)
    setIsDialogOpen(true)
  }

  const handleDownloadReport = async (studentData: typeof allStudentPerformance[0], action: "download" | "preview" = "download") => {
    const studentUser = students.find(s => s.id === studentData.id)
    if (!studentUser) return

    const { dynamicAttendance, dynamicMarks } = getStudentDynamicData(studentUser.id)
    await generateStudentSummaryPDF(studentUser, dynamicMarks as MarksRecord[], dynamicAttendance, action)
  }

  const handleDownloadAllReports = async () => {
    setIsDownloadingAll(true)
    try {
      for (const studentData of allStudentPerformance) {
        await handleDownloadReport(studentData, "download")
        // Add a small delay between downloads to prevent browser blocking or excessive resource usage
        await new Promise(r => setTimeout(r, 300))
      }
    } finally {
      setIsDownloadingAll(false)
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-base text-card-foreground">Student Performance Overview</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownloadAllReports}
          disabled={isDownloadingAll}
          className="bg-primary/5 hover:bg-primary/10 text-primary border-primary/20"
        >
          {isDownloadingAll ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Downloading...</>
          ) : (
            <><DownloadCloud className="w-4 h-4 mr-2" /> Download All Reports</>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border bg-secondary/50">
                <TableHead className="text-muted-foreground">Roll No</TableHead>
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground text-center">Attendance</TableHead>
                <TableHead className="text-muted-foreground text-center">Avg Marks</TableHead>
                <TableHead className="text-muted-foreground text-center">Grade</TableHead>
                <TableHead className="text-muted-foreground text-center">Status</TableHead>
                <TableHead className="text-muted-foreground text-center">Analytics</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allStudentPerformance.map((s) => {
                const isAtRisk = s.avgAttendance < 60 || s.avgMarks < 50
                return (
                  <TableRow key={s.id} className="border-border">
                    <TableCell className="text-foreground text-sm font-mono">{s.rollNumber}</TableCell>
                    <TableCell className="text-foreground text-sm font-medium">{s.name}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={s.avgAttendance >= 75 ? "default" : s.avgAttendance >= 60 ? "secondary" : "destructive"}
                        className="text-xs"
                      >
                        {s.avgAttendance}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-foreground text-sm text-center">{s.avgMarks}%</TableCell>
                    <TableCell className="text-center">
                      <span className={`text-sm font-bold ${s.grade === "A+" || s.grade === "A" ? "text-primary" :
                        s.grade === "B+" || s.grade === "B" ? "text-chart-2" :
                          s.grade === "C" ? "text-chart-3" : "text-destructive"
                        }`}>
                        {s.grade}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {isAtRisk ? (
                        <Badge variant="destructive" className="text-xs">At Risk</Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs text-primary border-primary/30">On Track</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="sm" onClick={() => openAnalytics(s)} className="text-primary hover:text-primary hover:bg-primary/10">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        {/* Individual Student Analytics Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-4xl bg-card border-border shadow-2xl">
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                Student Performance Analytics
              </DialogTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => selectedStudent && handleDownloadReport(selectedStudent, "preview")}
                  className="bg-secondary/20 hover:bg-secondary border-border text-foreground"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  onClick={() => selectedStudent && handleDownloadReport(selectedStudent, "download")}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>

            {selectedStudent && (
              <div className="grid lg:grid-cols-3 gap-6 pt-4">
                {/* Profile Profile & Core Stats */}
                <div className="flex flex-col gap-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-foreground">{selectedStudent.name}</h3>
                    <p className="text-sm text-muted-foreground font-mono">{selectedStudent.rollNumber}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-secondary/50 border border-border/50 flex flex-col items-center justify-center text-center">
                      <span className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Attendance</span>
                      <span className="text-2xl font-bold text-foreground">{selectedStudent.avgAttendance}%</span>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50 border border-border/50 flex flex-col items-center justify-center text-center">
                      <span className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Avg Marks</span>
                      <span className="text-2xl font-bold text-foreground">{selectedStudent.avgMarks}%</span>
                    </div>
                    <div className="col-span-2 p-4 rounded-xl bg-primary/5 border border-primary/20 flex flex-col items-center justify-center text-center">
                      <span className="text-xs text-primary mb-1 uppercase tracking-wider">Overall Grade</span>
                      <span className="text-3xl font-extrabold text-primary">{selectedStudent.grade}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h4 className="text-sm font-medium text-foreground">AI Status Assessment</h4>
                    {selectedStudent.avgAttendance < 60 || selectedStudent.avgMarks < 50 ? (
                      <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                        This student is currently heavily struggling with consistency. Immediate intervention is recommended for their academic recovery.
                      </p>
                    ) : selectedStudent.avgMarks > 85 ? (
                      <p className="text-sm text-primary bg-primary/10 p-3 rounded-lg border border-primary/20">
                        Outstanding academic performance. This student demonstrates high proficiency and reliability across core subjects.
                      </p>
                    ) : (
                      <p className="text-sm text-foreground/80 bg-secondary p-3 rounded-lg border border-border/50">
                        Stable performance. The student is maintaining average scores and meeting standard course requirements.
                      </p>
                    )}
                  </div>
                </div>

                {/* Radar Chart */}
                <div className="lg:col-span-2 bg-secondary/20 rounded-2xl border border-border/50 p-4">
                  <h4 className="text-sm font-bold text-foreground mb-4 pl-2">Subject Proficiency Radar</h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={[
                        { subject: "Data Struct", score: Math.min(100, selectedStudent.avgMarks + 12) },
                        { subject: "OS", score: Math.min(100, selectedStudent.avgMarks - 5) },
                        { subject: "Database", score: Math.min(100, selectedStudent.avgMarks + 8) },
                        { subject: "Networks", score: Math.min(100, selectedStudent.avgMarks - 12) },
                        { subject: "ML", score: Math.min(100, selectedStudent.avgMarks + 18) },
                      ]}>
                        <PolarGrid stroke="oklch(0.26 0.012 260)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: "oklch(0.60 0.01 260)", fontSize: 11 }} />
                        <Radar
                          name="Proficiency"
                          dataKey="score"
                          stroke={CHART_COLORS[0]}
                          fill={CHART_COLORS[0]}
                          fillOpacity={0.4}
                        />
                        <Tooltip
                          contentStyle={{ backgroundColor: "oklch(0.17 0.008 260)", border: "1px solid oklch(0.26 0.012 260)", borderRadius: 8, color: "oklch(0.93 0.005 260)" }}
                          formatter={(value: number) => [`${Math.max(0, value)}%`, 'Proficiency']}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

      </CardContent>
    </Card>
  )
}

// ---- Main Teacher Dashboard ----
export function TeacherDashboard() {
  const { user } = useAuth()

  const totalStudents = allStudentPerformance.length
  const atRiskStudents = allStudentPerformance.filter((s) => s.avgAttendance < 60 || s.avgMarks < 50).length
  const avgClassPerformance = Math.round(
    allStudentPerformance.reduce((acc, s) => acc + s.avgMarks, 0) / totalStudents
  )
  const lowAttendanceLecs = lectureAttendanceSummary.filter((l) => l.averageAttendance < 70).length

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border p-6 md:p-8 shadow-sm">
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Welcome back, {user?.name}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-xl">
              Ready to manage your students? Track attendance, analyze marks, and gain insights into class performance.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                {user?.department} Department
              </div>
              <div className="px-3 py-1 rounded-full bg-secondary border border-border text-muted-foreground text-xs font-medium">
                Academic Year 2025-26
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
          <TeacherStatCard
            icon={Users}
            label="Total Students"
            value={`${totalStudents}`}
            subtext="Across all subjects"
            variant="default"
          />
          <TeacherStatCard
            icon={BarChart3}
            label="Class Average"
            value={`${avgClassPerformance}%`}
            subtext="Overall marks"
            variant="success"
          />
          <TeacherStatCard
            icon={AlertTriangle}
            label="At Risk"
            value={`${atRiskStudents}`}
            subtext="Students need help"
            variant="warning"
          />
          <TeacherStatCard
            icon={TrendingDown}
            label="Low Attendance"
            value={`${lowAttendanceLecs}`}
            subtext="Subjects below 70%"
            variant="warning"
          />
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="analytics">
          <TabsList className="mb-4">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="attendance">Mark Attendance</TabsTrigger>
            <TabsTrigger value="marks">Enter Marks</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <AnalyticsSection />
          </TabsContent>

          <TabsContent value="attendance">
            <MarkAttendanceSection />
          </TabsContent>

          <TabsContent value="marks">
            <EnterMarksSection />
          </TabsContent>

          <TabsContent value="resources">
            <AddResourceSection />
          </TabsContent>

          <TabsContent value="quizzes">
            <ManageQuizzesSection />
          </TabsContent>

          <TabsContent value="students">
            <StudentPerformanceTable />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
