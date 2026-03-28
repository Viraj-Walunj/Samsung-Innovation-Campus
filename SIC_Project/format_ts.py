import os
import re

ts_file = "C:\\Users\\sawan\\Downloads\\ty_div_c_output.ts"
lib_file = "a:\\Project\\lib\\data.ts"

with open(ts_file, "r") as f:
    ts_content = f.read()

# Make the email of the first student "student@demo.edu" so it's easy to login
ts_content = re.sub(r'email: "(.*?)@student\.edu"', r'email: "student@demo.edu"', ts_content, count=1)

with open(lib_file, "r") as f:
    lib_data = f.read()

# Replace between "// ---- USERS GENERATION" and "export const teachers"
pattern = re.compile(r"// ---- USERS GENERATION \(70 Students\) ----.*?export const teachers:", re.DOTALL)
replacement = f"// ---- USERS GENERATION FROM EXCEL ----\n{ts_content}\n\nexport const teachers:"

new_lib_data = pattern.sub(replacement, lib_data)

# We also need to fix `allStudentPerformance` and `marksVsAttendance` which references `students[0]`'s old name
new_lib_data = re.sub(r'name: "Arjun Mehta"', r'name: students[0].name', new_lib_data)
# Wait, let's just make sure "Arjun Mehta" is completely removed.
new_lib_data = re.sub(r'if \(i === 0\) \{\s+return \{ id: "s1", name: ".*?", rollNumber: ".*?", avgAttendance: 82, avgMarks: 78, grade: "A" \}\s+\}',
                      r'if (i === 0) { return { id: "s1", name: students[0].name, rollNumber: students[0].rollNumber || "", avgAttendance: 82, avgMarks: 78, grade: "A" } }', new_lib_data, flags=re.DOTALL)


with open(lib_file, "w") as f:
    f.write(new_lib_data)

# Now update the login page
login_page = "a:\\Project\\components\\login-page.tsx"
with open(login_page, "r") as f:
    lp_data = f.read()

lp_data = lp_data.replace("arjun@student.edu", "student@demo.edu")

with open(login_page, "w") as f:
    f.write(lp_data)

print("Updated perfectly.")
