import { subjects, allStudentPerformance } from "./data"

export function getStudentDynamicData(studentId: string) {
    const studentInfo = allStudentPerformance.find(p => p.id === studentId) || allStudentPerformance[0]
    const seed = (parseInt(studentId.replace(/\D/g, "") || "1"))

    // Generate unique attendance per subject
    const dynamicAttendance = subjects.map((sub, i) => {
        const variation = ((seed * (i + 1)) % 16) - 8 // +/- 8%
        const percentage = Math.min(100, Math.max(30, studentInfo.avgAttendance + variation))
        const total = 40
        return {
            subjectId: sub.id,
            subjectName: sub.name,
            percentage: Math.round(percentage),
            attended: Math.round((percentage / 100) * total),
            total: total
        }
    })

    // Generate unique marks per assessment
    const dynamicMarks = subjects.flatMap((sub, i) => {
        return (["quiz", "midterm", "assignment", "final"] as const).map((type, j) => {
            const maxMarks = type === "final" ? 100 : type === "midterm" ? 50 : 20
            const variation = ((seed * (i + j + 1)) % 20) / 100 - 0.1 // +/- 10%
            const percentage = Math.min(100, Math.max(10, (studentInfo.avgMarks || 70) + variation * 100))
            return {
                studentId: studentId,
                subjectId: sub.id,
                examType: type,
                maxMarks,
                obtainedMarks: Math.round((percentage / 100) * maxMarks),
                date: "2025-10-15"
            }
        })
    })

    return { dynamicAttendance, dynamicMarks }
}
