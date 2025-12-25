export const teachers = [
    { id: 'T001', name: 'Nasrullah Jamil', subject: 'Electronics', email: 'nasrullah.jamil@gctbhakkar.edu' },
    { id: 'T002', name: 'Joun Abbas', subject: 'English', email: 'joun.abbas@gctbhakkar.edu' },
    { id: 'T003', name: 'Rao M. Haziq', subject: 'Computer Science', email: 'rao.haziq@gctbhakkar.edu' },
    { id: 'T004', name: 'Tanveer Saqib', subject: 'Electronics', email: 'tanveer.saqib@gctbhakkar.edu' },
    { id: 'T005', name: 'Khurram Shahzad', subject: 'Mathematics', email: 'khurram.shahzad@gctbhakkar.edu' },
    { id: 'T006', name: 'Ijaz Ahmad', subject: 'Computer Science', email: 'ijaz.ahmad@gctbhakkar.edu' },
    { id: 'T007', name: 'Umair Khalil', subject: 'Career Counseling', email: 'umair.khalil@gctbhakkar.edu' },
    { id: 'T008', name: 'Zohaib Hassan', subject: 'Chemistry', email: 'zohaib.hassan@gctbhakkar.edu' },
    { id: 'T009', name: 'Shah Hussain', subject: 'Physics', email: 'shah.hussain@gctbhakkar.edu' },
    { id: 'T010', name: 'Mohib Mahdi', subject: 'Technology & Tools', email: 'mohib.mahdi@gctbhakkar.edu' },
    { id: 'T011', name: 'Inayat Ali Khan', subject: 'General Studies', email: 'inayat.khan@gctbhakkar.edu' },
    { id: 'T012', name: 'Muhammad Ismail', subject: 'Computer Science', email: 'm.ismail@gctbhakkar.edu' },
    { id: 'T013', name: 'Mahmood-ul-Hasan', subject: 'Computer Science', email: 'mahmood.hasan@gctbhakkar.edu' },
    { id: 'T014', name: 'Imran Kafi', subject: 'Management', email: 'imran.kafi@gctbhakkar.edu' },
    { id: 'T015', name: 'Muhammad Zeshan', subject: 'Computer Science', email: 'm.zeshan@gctbhakkar.edu' },
];

export const classes = [
    { id: 'C001', name: '1st Year CIT', section: 'Second Shift', year: 1, department: 'CIT', strength: 45 },
    { id: 'C002', name: '2nd Year CIT', section: 'Second Shift', year: 2, department: 'CIT', strength: 40 },
    { id: 'C003', name: '3rd Year CIT', section: 'Second Shift', year: 3, department: 'CIT', strength: 38 },
];

export const subjects = [
    { id: 'S001', name: 'Computer Applications', code: 'CIT-124' },
    { id: 'S002', name: 'English', code: 'Eng-112' },
    { id: 'S003', name: 'Programming Fundamentals', code: 'CIT-114' },
    { id: 'S004', name: 'Applied Mathematics', code: 'Math-123' },
    { id: 'S005', name: 'Computer Hardware', code: 'CIT-103' },
    { id: 'S006', name: 'Chemistry', code: 'CH-132' },
    { id: 'S007', name: 'Physics', code: 'Phy-132' },
];

export const rooms = [
    { id: 'R001', name: 'Computer Lab-1' },
    { id: 'R002', name: 'Computer Lab-2' },
    { id: 'R003', name: 'Computer Lab-3' },
    { id: 'R004', name: 'Electronics Lab' },
    { id: 'R005', name: 'Basic Lab-ET' },
    { id: 'R006', name: 'Physics Lab' },
    { id: 'R007', name: 'Chemistry Lab' },
    { id: 'R008', name: 'Room-2' },
];

export const periods = [
    { id: 'P1', name: 'Period 1', startTime: '12:10', endTime: '12:50' },
    { id: 'P2', name: 'Period 2', startTime: '12:50', endTime: '01:30' },
    { id: 'P3', name: 'Period 3', startTime: '01:30', endTime: '02:10' },
    { id: 'BREAK', name: 'Break', startTime: '02:10', endTime: '02:40', isBreak: true },
    { id: 'P4', name: 'Period 4', startTime: '02:40', endTime: '03:20' },
    { id: 'P5', name: 'Period 5', startTime: '03:20', endTime: '04:00' },
    { id: 'P6', name: 'Period 6', startTime: '04:00', endTime: '04:40' },
    { id: 'P7', name: 'Period 7', startTime: '04:40', endTime: '05:20' },
    { id: 'P8', name: 'Period 8', startTime: '05:20', endTime: '06:00' },
];

export const weeklyTimetable = [
    { id: 'L1M1', day: 'Monday', periodId: 'P1', classId: 'C001', subjectId: 'S001', teacherId: 'T001', roomId: 'R004', status: 'scheduled', lectureType: 'theory' },
    { id: 'L1M2', day: 'Monday', periodId: 'P2', classId: 'C001', subjectId: 'S002', teacherId: 'T002', roomId: 'R002', status: 'scheduled', lectureType: 'theory' },
    { id: 'L1M3', day: 'Monday', periodId: 'P3', classId: 'C001', subjectId: 'S003', teacherId: 'T003', roomId: 'R001', status: 'scheduled', lectureType: 'theory' },
    // 2nd Year Data
    { id: 'L2M1', day: 'Monday', periodId: 'P1', classId: 'C002', subjectId: 'S004', teacherId: 'T004', roomId: 'R001', status: 'ongoing', lectureType: 'theory' },
    { id: 'L2M2', day: 'Monday', periodId: 'P2', classId: 'C002', subjectId: 'S005', teacherId: 'T005', roomId: 'R002', status: 'scheduled', lectureType: 'theory' },
    // 3rd Year Data
    { id: 'L3M1', day: 'Monday', periodId: 'P2', classId: 'C003', subjectId: 'S006', teacherId: 'T006', roomId: 'R003', status: 'scheduled', lectureType: 'theory' },
    { id: 'L3M2', day: 'Monday', periodId: 'P3', classId: 'C003', subjectId: 'S007', teacherId: 'T007', roomId: 'R004', status: 'scheduled', lectureType: 'theory' },
];

export const roles = [
    { value: 'admin', label: 'Administrator', color: 'bg-primary' },
    { value: 'teacher', label: 'Teacher', color: 'bg-teal-500' },
    { value: 'cr', label: 'Class Representative', color: 'bg-indigo-500' },
    { value: 'student', label: 'Student', color: 'bg-success' },
];

export const menuItems = {
    admin: [
        { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
        { id: 'classes', label: 'Classes & Sections', icon: 'graduation-cap' },
        { id: 'teachers', label: 'Teachers', icon: 'users' },
        { id: 'subjects', label: 'Subjects', icon: 'book-open' },
        { id: 'rooms', label: 'Rooms', icon: 'door-open' },
        { id: 'periods', label: 'Periods', icon: 'clock' },
        { id: 'timetable', label: 'Timetable Engine', icon: 'calendar' },
        { id: 'live-monitor', label: 'Live Lecture Monitor', icon: 'activity' },
        { id: 'analytics', label: 'Reports & Analytics', icon: 'bar-chart-3' },
    ],
    teacher: [
        { id: 'dashboard', label: 'My Schedule', icon: 'calendar' },
        { id: 'substitutions', label: 'Substitutions', icon: 'git-branch' },
    ],
    student: [
        { id: 'dashboard', label: 'Timetable', icon: 'calendar' },
        { id: 'exams', label: 'Exams', icon: 'file-text' },
    ],
    cr: [
        { id: 'dashboard', label: 'Class Operations', icon: 'users' },
    ]
};
