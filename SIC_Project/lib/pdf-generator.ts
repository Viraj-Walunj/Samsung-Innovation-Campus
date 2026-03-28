import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import { format, differenceInDays } from "date-fns"
import type { User, MarksRecord } from "./data"

export const generateStudentSummaryPDF = async (
    student: User,
    marks: MarksRecord[],
    attendance: any[],
    action: "download" | "preview" = "download"
) => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const semesterEndDate = new Date("2026-05-31")
    const today = new Date()
    const daysRemaining = differenceInDays(semesterEndDate, today)

    // Header
    doc.setFillColor(31, 41, 55) // Dark background
    doc.rect(0, 0, pageWidth, 40, "F")

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(22)
    doc.setFont("helvetica", "bold")
    doc.text("STUDENT PERFORMANCE SUMMARY", pageWidth / 2, 25, { align: "center" })

    // Student Info
    doc.setTextColor(31, 41, 55)
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(`Name: ${student.name}`, 15, 55)
    doc.text(`Roll Number: ${student.rollNumber || "N/A"}`, 15, 62)
    doc.text(`Department: ${student.department || "Computer Science"}`, 15, 69)
    doc.text(`Report Date: ${format(today, "PP")}`, pageWidth - 15, 55, { align: "right" })

    // Performance Summary
    const avgMarks = marks.length > 0 ? marks.reduce((acc, m) => acc + (m.obtainedMarks / m.maxMarks) * 100, 0) / marks.length : 0
    const avgAttendance = attendance.length > 0 ? attendance.reduce((acc, a) => acc + a.percentage, 0) / attendance.length : 0

    doc.setFont("helvetica", "bold")
    doc.text("OVERALL PERFORMANCE", 15, 85)
    doc.setLineWidth(0.5)
    doc.line(15, 87, 80, 87)

    doc.setFont("helvetica", "normal")
    doc.text(`Average Marks: ${avgMarks.toFixed(2)}%`, 15, 95)
    doc.text(`Average Attendance: ${avgAttendance.toFixed(2)}%`, 15, 102)
    doc.text(`Days Remaining in Semester: ${daysRemaining} days`, 15, 109)

    // Improvement Suggestions
    doc.setFont("helvetica", "bold")
    doc.text("RECOMMENDED IMPROVEMENTS", 15, 125)
    doc.setLineWidth(0.5)
    doc.line(15, 127, 95, 127)

    doc.setFont("helvetica", "normal")
    let currentY = 135
    const suggestions: string[] = []

    if (avgAttendance < 75) {
        suggestions.push(`• Increase attendance (current: ${avgAttendance.toFixed(1)}%). Aim for 75%+ to meet university criteria.`)
    } else {
        suggestions.push(`• Attendance is good (${avgAttendance.toFixed(1)}%). Continue maintaining consistent presence.`)
    }

    if (avgMarks < 70) {
        suggestions.push(`• Focus on core subjects (especially those with < 60% marks). Use the next ${daysRemaining} days for targeted revision.`)
    } else if (avgMarks < 85) {
        suggestions.push(`• Solid performance. Aim for > 85% by practicing past exam papers in the remaining ${daysRemaining} days.`)
    } else {
        suggestions.push(`• Excellent academic standing. Consider taking on additional projects or helping peers.`)
    }

    const subjectsToImprove = attendance.filter(a => a.percentage < 75).map(a => a.subjectName)
    if (subjectsToImprove.length > 0) {
        suggestions.push(`• Critical subjects for attendance: ${subjectsToImprove.join(", ")}.`)
    }

    suggestions.forEach(s => {
        const lines = doc.splitTextToSize(s, pageWidth - 30)
        doc.text(lines, 15, currentY)
        currentY += lines.length * 7
    })

    // Subject Table
    doc.setFont("helvetica", "bold")
    doc.text("SUBJECT-WISE ATTENDANCE", 15, currentY + 10)

    const tableData = attendance.map(a => [
        a.subjectName,
        `${a.attended}/${a.total}`,
        `${a.percentage}%`,
        a.percentage < 75 ? "NEEDS IMPROVEMENT" : "SATISFACTORY"
    ])

    autoTable(doc, {
        startY: currentY + 15,
        head: [["Subject", "Classes Attended", "Percentage", "Status"]],
        body: tableData,
        headStyles: { fillColor: [31, 41, 55] },
        alternateRowStyles: { fillColor: [243, 244, 246] },
    })

    // Footer
    const pageCount = (doc as any).internal.pages.length - 1
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(10)
        doc.setTextColor(150)
        doc.text(`PERFOMIX - Automated Student Advisory Report | Page ${i} of ${pageCount}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: "center" })
    }

    const fileName = `${student.name.replace(/\s+/g, "_")}_Performance_Summary.pdf`

    if (action === "preview") {
        const blob = doc.output("blob")
        const url = URL.createObjectURL(blob)
        window.open(url, "_blank")
    } else {
        doc.save(fileName)
    }
}
