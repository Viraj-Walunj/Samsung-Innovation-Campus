// ===============================
// STATIC DATA FOR PERFOMIX
// Replace with API calls when backend is ready
// ===============================

export type UserRole = "student" | "teacher"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  department?: string
  rollNumber?: string
}

export interface Subject {
  id: string
  name: string
  code: string
  teacherId: string
  totalLectures: number
}

export interface AttendanceRecord {
  date: string
  subjectId: string
  studentId: string
  present: boolean
}

export interface MarksRecord {
  studentId: string
  subjectId: string
  examType: "quiz" | "midterm" | "final" | "assignment"
  maxMarks: number
  obtainedMarks: number
  date: string
}

export interface LectureAttendanceSummary {
  subjectId: string
  subjectName: string
  totalStudents: number
  averageAttendance: number
  lecturesTaken: number
  totalLectures: number
}

// ---- USERS GENERATION FROM EXCEL ----
export const students: User[] = [
  { id: "s1", name: "Shelke Abhijit Tanaji", email: "student@demo.edu", role: "student", department: "Computer Science", rollNumber: "CSTC001" },
  { id: "s2", name: "Phalke Abhishek Ajit", email: "phalke8@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC002" },
  { id: "s3", name: "Somwanshi Abhishek Balaji", email: "somwanshi9@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC003" },
  { id: "s4", name: "Aditya Mahesh Patil", email: "aditya10@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC004" },
  { id: "s5", name: "Aditya Sawant", email: "sawant.aditya102005@gmail.com", role: "student", department: "Computer Science", rollNumber: "CSTC005" },
  { id: "s6", name: "Ishika Kathuria", email: "ishika12@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC006" },
  { id: "s7", name: "Manas Pandya", email: "manas13@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC007" },
  { id: "s8", name: "Godaji Amit Milind", email: "godaji14@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC008" },
  { id: "s9", name: "Gangwani Anisha Sunil", email: "gangwani15@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC010" },
  { id: "s10", name: "Arnav Sinha", email: "arnav16@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC011" },
  { id: "s11", name: "Ghodekar Aryan Naresh", email: "ghodekar17@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC012" },
  { id: "s12", name: "Aryan Rajendra Patil", email: "aryan18@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC013" },
  { id: "s13", name: "Dhavale Ashish Ramesh", email: "dhavale19@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC014" },
  { id: "s14", name: "Humbe Atharv Anil", email: "humbe20@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC015" },
  { id: "s15", name: "Chinchore Atharv Kishor", email: "chinchore21@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC016" },
  { id: "s16", name: "Chavan Atharv Rajendra", email: "chavan22@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC017" },
  { id: "s17", name: "Dalvi Atharv Milind", email: "dalvi23@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC018" },
  { id: "s18", name: "Kinge Ayush Vikas", email: "kinge24@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC019" },
  { id: "s19", name: "Bhuvan Sanjay Jadhav", email: "bhuvan25@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC020" },
  { id: "s20", name: "Kharmare Chintan Babusha", email: "kharmare26@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC021" },
  { id: "s21", name: "Chirag Sanjay Oswal", email: "chirag27@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC022" },
  { id: "s22", name: "Oswal Daksh Sagar", email: "oswal28@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC023" },
  { id: "s23", name: "Ghadge Devendra Dattatray", email: "ghadge29@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC024" },
  { id: "s24", name: "Kurhade Gauri  Arjun", email: "kurhade30@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC025" },
  { id: "s25", name: "Narkhede Kunal Vinod", email: "narkhede31@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC026" },
  { id: "s26", name: "Khushi Deshmukh", email: "khushi32@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC027" },
  { id: "s27", name: "Omkar Randave", email: "omkar33@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC028" },
  { id: "s28", name: "Patil Pranjal Nandu", email: "patil34@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC029" },
  { id: "s29", name: "Pandit Pranjali Rahul", email: "pandit35@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC030" },
  { id: "s30", name: "Jadhav Prathamesh Anil", email: "jadhav36@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC031" },
  { id: "s31", name: "Sail Purva Sudhakar", email: "sail37@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC032" },
  { id: "s32", name: "Konde Raj Amol", email: "konde38@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC033" },
  { id: "s33", name: "Singh Raj Ranjeet", email: "singh39@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC034" },
  { id: "s34", name: "Gunavare Renu Pravin", email: "gunavare40@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC035" },
  { id: "s35", name: "Gund Ruchita Dilip", email: "gund41@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC036" },
  { id: "s36", name: "Saloni Ashwinikumar Jha", email: "saloni42@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC037" },
  { id: "s37", name: "Deshmukh Samruddhi Maruti", email: "deshmukh43@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC038" },
  { id: "s38", name: "Patade Sana Ajit", email: "patade44@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC039" },
  { id: "s39", name: "Bhalke Sangramjeet Prakash", email: "bhalke45@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC040" },
  { id: "s40", name: "Sanjana Patra", email: "sanjana46@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC041" },
  { id: "s41", name: "Gawade Sarang Ganesh", email: "gawade47@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC042" },
  { id: "s42", name: "Saumitra Milind Tambe", email: "saumitra48@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC043" },
  { id: "s43", name: "Sharma Sejal Nathilal", email: "sharma49@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC044" },
  { id: "s44", name: "Shivani Saraswat", email: "shivani50@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC045" },
  { id: "s45", name: "Shivank Wadke", email: "shivank51@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC046" },
  { id: "s46", name: "Pansare Shubham Dattatray", email: "pansare52@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC047" },
  { id: "s47", name: "Javeer Siddhesh Subhash", email: "javeer53@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC048" },
  { id: "s48", name: "Soumya Pandey", email: "soumya54@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC049" },
  { id: "s49", name: "Kumbhar Sumedh Subhash", email: "kumbhar55@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC050" },
  { id: "s50", name: "Mapari Sumeet Kiran", email: "mapari56@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC051" },
  { id: "s51", name: "Panchal Swayam Ashok", email: "panchal57@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC052" },
  { id: "s52", name: "Potdar Tejas Prashant", email: "potdar58@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC053" },
  { id: "s53", name: "Tiya Sahu", email: "tiya59@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC054" },
  { id: "s54", name: "Utkarsh Patole", email: "utkarsh60@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC055" },
  { id: "s55", name: "Vedang  Pujari", email: "vedang61@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC056" },
  { id: "s56", name: "Walunj Viraj Sunil", email: "walunj62@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC057" },
  { id: "s57", name: "Gaikwad Akanksha Ashok", email: "gaikwad63@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC058" },
  { id: "s58", name: "Om Lokhande", email: "om64@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC059" },
  { id: "s59", name: "Kale Vedant  Rajesh", email: "kale65@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC060" },
  { id: "s60", name: "Gaikwad Prajwal Rajabhau", email: "gaikwad66@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC061" },
  { id: "s61", name: "Gite Shravani Sameer", email: "gite67@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC062" },
  { id: "s62", name: "Jadhav Aditya Yogendra", email: "jadhav68@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC063" },
  { id: "s63", name: "Supekar Soham Sanjay", email: "supekar69@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC064" },
  { id: "s64", name: "Koli Soham Suraj", email: "koli70@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC065" },
  { id: "s65", name: "Gheware Sandesh Dattatrya", email: "gheware71@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC066" },
  { id: "s66", name: "Mandlik Purvaja Sachin", email: "mandlik72@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC067" },
  { id: "s67", name: "Rakshan Parashar", email: "rakshan73@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC068" },
  { id: "s68", name: "Bhingarde Sujal Somnath", email: "bhingarde74@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC069" },
  { id: "s69", name: "Patil Tanmay Nilesh", email: "patil75@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC070" },
  { id: "s70", name: "Pawar Payal Bhimsen", email: "pawar76@student.edu", role: "student", department: "Computer Science", rollNumber: "CSTC071" },
]

export const teachers: User[] = [
  { id: "t1", name: "Dr. Rajesh Kumar", email: "rajesh@teacher.edu", role: "teacher", department: "Computer Science" },
  { id: "t2", name: "Prof. Meena Iyer", email: "meena@teacher.edu", role: "teacher", department: "Computer Science" },
]

export const subjects: Subject[] = [
  { id: "sub1", name: "Data Structures", code: "CS301", teacherId: "t1", totalLectures: 40 },
  { id: "sub2", name: "Operating Systems", code: "CS302", teacherId: "t1", totalLectures: 38 },
  { id: "sub3", name: "Database Management", code: "CS303", teacherId: "t2", totalLectures: 36 },
  { id: "sub4", name: "Computer Networks", code: "CS304", teacherId: "t2", totalLectures: 35 },
  { id: "sub5", name: "Machine Learning", code: "CS305", teacherId: "t1", totalLectures: 42 },
]

export const studentAttendance: { subjectId: string; subjectName: string; attended: number; total: number; percentage: number }[] = [
  { subjectId: "sub1", subjectName: "Data Structures", attended: 34, total: 40, percentage: 85 },
  { subjectId: "sub2", subjectName: "Operating Systems", attended: 30, total: 38, percentage: 79 },
  { subjectId: "sub3", subjectName: "Database Management", attended: 32, total: 36, percentage: 89 },
  { subjectId: "sub4", subjectName: "Computer Networks", attended: 24, total: 35, percentage: 69 },
  { subjectId: "sub5", subjectName: "Machine Learning", attended: 38, total: 42, percentage: 90 },
]

export const studentMarks: MarksRecord[] = [
  { studentId: "s1", subjectId: "sub1", examType: "quiz", maxMarks: 20, obtainedMarks: 17, date: "2025-09-15" },
  { studentId: "s1", subjectId: "sub1", examType: "midterm", maxMarks: 50, obtainedMarks: 42, date: "2025-10-20" },
  { studentId: "s1", subjectId: "sub1", examType: "assignment", maxMarks: 30, obtainedMarks: 28, date: "2025-11-01" },
  { studentId: "s1", subjectId: "sub1", examType: "final", maxMarks: 100, obtainedMarks: 82, date: "2025-12-15" },
  { studentId: "s1", subjectId: "sub2", examType: "quiz", maxMarks: 20, obtainedMarks: 14, date: "2025-09-18" },
  { studentId: "s1", subjectId: "sub2", examType: "midterm", maxMarks: 50, obtainedMarks: 35, date: "2025-10-22" },
  { studentId: "s1", subjectId: "sub2", examType: "assignment", maxMarks: 30, obtainedMarks: 22, date: "2025-11-05" },
  { studentId: "s1", subjectId: "sub2", examType: "final", maxMarks: 100, obtainedMarks: 68, date: "2025-12-18" },
  { studentId: "s1", subjectId: "sub3", examType: "quiz", maxMarks: 20, obtainedMarks: 18, date: "2025-09-20" },
  { studentId: "s1", subjectId: "sub3", examType: "midterm", maxMarks: 50, obtainedMarks: 44, date: "2025-10-25" },
  { studentId: "s1", subjectId: "sub3", examType: "assignment", maxMarks: 30, obtainedMarks: 27, date: "2025-11-08" },
  { studentId: "s1", subjectId: "sub3", examType: "final", maxMarks: 100, obtainedMarks: 88, date: "2025-12-20" },
  { studentId: "s1", subjectId: "sub4", examType: "quiz", maxMarks: 20, obtainedMarks: 12, date: "2025-09-22" },
  { studentId: "s1", subjectId: "sub4", examType: "midterm", maxMarks: 50, obtainedMarks: 30, date: "2025-10-28" },
  { studentId: "s1", subjectId: "sub4", examType: "assignment", maxMarks: 30, obtainedMarks: 20, date: "2025-11-10" },
  { studentId: "s1", subjectId: "sub4", examType: "final", maxMarks: 100, obtainedMarks: 58, date: "2025-12-22" },
  { studentId: "s1", subjectId: "sub5", examType: "quiz", maxMarks: 20, obtainedMarks: 19, date: "2025-09-25" },
  { studentId: "s1", subjectId: "sub5", examType: "midterm", maxMarks: 50, obtainedMarks: 46, date: "2025-10-30" },
  { studentId: "s1", subjectId: "sub5", examType: "assignment", maxMarks: 30, obtainedMarks: 29, date: "2025-11-12" },
  { studentId: "s1", subjectId: "sub5", examType: "final", maxMarks: 100, obtainedMarks: 91, date: "2025-12-25" },
]

export const lectureAttendanceSummary: LectureAttendanceSummary[] = [
  { subjectId: "sub1", subjectName: "Data Structures", totalStudents: 70, averageAttendance: 78, lecturesTaken: 38, totalLectures: 40 },
  { subjectId: "sub2", subjectName: "Operating Systems", totalStudents: 70, averageAttendance: 65, lecturesTaken: 35, totalLectures: 38 },
  { subjectId: "sub3", subjectName: "Database Management", totalStudents: 70, averageAttendance: 82, lecturesTaken: 34, totalLectures: 36 },
  { subjectId: "sub4", subjectName: "Computer Networks", totalStudents: 70, averageAttendance: 58, lecturesTaken: 30, totalLectures: 35 },
  { subjectId: "sub5", subjectName: "Machine Learning", totalStudents: 70, averageAttendance: 88, lecturesTaken: 40, totalLectures: 42 },
]

export const monthlyAttendanceTrend = [
  { month: "Aug", attendance: 92 },
  { month: "Sep", attendance: 87 },
  { month: "Oct", attendance: 80 },
  { month: "Nov", attendance: 72 },
  { month: "Dec", attendance: 68 },
  { month: "Jan", attendance: 74 },
]

export const classAverageMarks = [
  { subject: "Data Structures", quiz: 15.2, midterm: 38.5, final: 74.8, assignment: 24.6 },
  { subject: "Operating Systems", quiz: 13.1, midterm: 33.2, final: 62.4, assignment: 21.3 },
  { subject: "Database Management", quiz: 16.4, midterm: 40.1, final: 79.2, assignment: 25.8 },
  { subject: "Computer Networks", quiz: 11.8, midterm: 28.9, final: 56.3, assignment: 19.2 },
  { subject: "Machine Learning", quiz: 17.1, midterm: 42.3, final: 83.6, assignment: 26.9 },
]

export const allStudentPerformance = students.map((stu, i) => {
  if (i === 0) {
    return { id: "s1", name: students[0].name, rollNumber: "CS2024001", avgAttendance: 82, avgMarks: 78, grade: "A" }
  }
  const avgAtt = 50 + ((i * 17) % 50)
  const avgMk = 40 + ((i * 23) % 60)
  let gr = "D"
  if (avgMk >= 90) gr = "A+"
  else if (avgMk >= 80) gr = "A"
  else if (avgMk >= 70) gr = "B+"
  else if (avgMk >= 60) gr = "B"
  else if (avgMk >= 50) gr = "C"

  return {
    id: stu.id,
    name: stu.name,
    rollNumber: stu.rollNumber || "",
    avgAttendance: avgAtt,
    avgMarks: avgMk,
    grade: gr,
  }
})

export const marksVsAttendance = allStudentPerformance.map((stu) => ({
  studentName: stu.name,
  attendance: Math.min(100, Math.max(0, stu.avgAttendance + ((stu.avgAttendance % 2 === 0) ? 5 : -5))),
  marks: Math.min(100, Math.max(0, stu.avgMarks + ((stu.avgMarks % 3 === 0) ? 4 : -4))),
  subject: ((stu.avgAttendance % 2) === 0) ? "Data Structures" : "Operating Systems",
}))

export const gradeDistribution = [
  { grade: "A+", count: allStudentPerformance.filter(s => s.grade === "A+").length },
  { grade: "A", count: allStudentPerformance.filter(s => s.grade === "A").length },
  { grade: "B+", count: allStudentPerformance.filter(s => s.grade === "B+").length },
  { grade: "B", count: allStudentPerformance.filter(s => s.grade === "B").length },
  { grade: "C", count: allStudentPerformance.filter(s => s.grade === "C").length },
  { grade: "D", count: allStudentPerformance.filter(s => s.grade === "D").length },
]
