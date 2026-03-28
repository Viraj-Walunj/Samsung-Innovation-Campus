// ===============================
// API STUBS - Replace with real API calls when backend is ready
// ===============================

import type { User, UserRole } from "./data"
import {
  students,
  teachers,
  studentAttendance,
  studentMarks,
  lectureAttendanceSummary,
  monthlyAttendanceTrend,
  marksVsAttendance,
  classAverageMarks,
  allStudentPerformance,
  gradeDistribution,
  subjects,
} from "./data"

// --- AUTH ---
// TODO: Replace with real API call
export async function loginUser(email: string, password: string, role: UserRole): Promise<User | null> {
  // Simulate API delay
  await new Promise((r) => setTimeout(r, 500))

  // For demo purposes, we only allow access with the password 'demo123'
  if (password !== "demo123") {
    return null
  }

  const allUsers = [...students, ...teachers] // Permissive search across all users
  const searchEmail = email.toLowerCase()
  const emailPrefix = searchEmail.split("@")[0]
  const nameParts = emailPrefix.split(/[._]/) // Split by . or _

  // 1. Try exact email match first
  let user = allUsers.find((u) => u.email.toLowerCase() === searchEmail)

  // 2. If no exact match found, try fuzzy name match (e.g., firstname.lastname@student.edu)
  if (!user && nameParts.length >= 1) {
    user = allUsers.find((u) => {
      const uName = u.name.toLowerCase()
      // Check if all substantial parts of the email prefix are present in the user's full name
      return nameParts.every(part => part.length > 2 && uName.includes(part))
    })
  }

  return user ?? null
}

// --- STUDENT APIs ---
// TODO: Replace with real API call
export async function fetchStudentAttendance(_studentId: string) {
  await new Promise((r) => setTimeout(r, 300))
  return studentAttendance
}

// TODO: Replace with real API call
export async function fetchStudentMarks(_studentId: string) {
  await new Promise((r) => setTimeout(r, 300))
  return studentMarks
}

// --- TEACHER APIs ---
// TODO: Replace with real API call
export async function fetchLectureAttendanceSummary(_teacherId: string) {
  await new Promise((r) => setTimeout(r, 300))
  return lectureAttendanceSummary
}

// TODO: Replace with real API call
export async function fetchMonthlyAttendanceTrend(_teacherId: string) {
  await new Promise((r) => setTimeout(r, 300))
  return monthlyAttendanceTrend
}

// TODO: Replace with real API call
export async function fetchMarksVsAttendance(_teacherId: string) {
  await new Promise((r) => setTimeout(r, 300))
  return marksVsAttendance
}

// TODO: Replace with real API call
export async function fetchClassAverageMarks(_teacherId: string) {
  await new Promise((r) => setTimeout(r, 300))
  return classAverageMarks
}

// TODO: Replace with real API call
export async function fetchAllStudentPerformance(_teacherId: string) {
  await new Promise((r) => setTimeout(r, 300))
  return allStudentPerformance
}

// TODO: Replace with real API call
export async function fetchGradeDistribution(_teacherId: string) {
  await new Promise((r) => setTimeout(r, 300))
  return gradeDistribution
}

// TODO: Replace with real API call
export async function fetchSubjects(_teacherId: string) {
  await new Promise((r) => setTimeout(r, 300))
  return subjects
}

// TODO: Replace with real API call
export async function markAttendance(
  _subjectId: string,
  _date: string,
  _attendance: { studentId: string; present: boolean }[]
) {
  await new Promise((r) => setTimeout(r, 500))
  return { success: true }
}

// TODO: Replace with real API call
export async function submitMarks(
  _subjectId: string,
  _examType: string,
  _marks: { studentId: string; obtainedMarks: number; maxMarks: number }[]
) {
  await new Promise((r) => setTimeout(r, 500))
  return { success: true }
}
