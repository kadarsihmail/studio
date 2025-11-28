
import { PlaceHolderImages } from './placeholder-images';

export type Lecturer = {
  id: string;
  lecturerId: string;
  name: string;
  department: string;
  faculty: string;
  avatarUrl: string;
  courses: Course[];
  status: 'Full-time' | 'Part-time' | 'Contract';
};

export type Course = {
  id: string;
  name: string;
  code: string;
  lecturer: Omit<Lecturer, 'courses' | 'lecturerId' | 'department' | 'faculty' | 'status'>;
  schedule: string;
  room: string;
  studentCount: number;
  credits: 2 | 3 | 4;
  classType: 'Regular' | 'Executive' | 'Weekend';
};

export type AttendanceRecord = {
  id: string;
  course: Course;
  lecturer: Omit<Lecturer, 'courses' | 'lecturerId' | 'department' | 'faculty' | 'status'>;
  scanTime: Date;
  status: "Present" | "Late";
};

export type Student = {
  id: string;
  studentId: string;
  name: string;
  major: string;
  batchYear: number;
  avatarUrl: string;
};

export type Exam = {
    id: string;
    courseName: string;
    courseCode: string;
    examType: 'Midterm' | 'Final';
    schedule: string;
    room: string;
};

export type SupervisionRecord = {
    id: string;
    exam: Exam;
    supervisor: Omit<Lecturer, 'courses' | 'lecturerId' | 'department' | 'faculty' | 'status'>;
    scanTime: Date;
    status: 'Present';
};


const baseLecturers = [
  { id: 'lec-1', lecturerId: '0123456789', name: 'Dr. Aris', department: 'Informatics Engineering', faculty: 'Faculty of Computer Science', avatarUrl: PlaceHolderImages.find(img => img.id === 'lecturer-1')?.imageUrl || '', status: 'Full-time' as const },
  { id: 'lec-2', lecturerId: '0987654321', name: 'Prof. Budi', department: 'Information Systems', faculty: 'Faculty of Computer Science', avatarUrl: PlaceHolderImages.find(img => img.id === 'lecturer-2')?.imageUrl || '', status: 'Contract' as const },
  { id: 'lec-3', lecturerId: '1122334455', name: 'Dr. Citra', department: 'Computer Engineering', faculty: 'Faculty of Engineering', avatarUrl: PlaceHolderImages.find(img => img.id === 'lecturer-3')?.imageUrl || '', status: 'Part-time' as const },
] as const;


export const courses: Course[] = [
  { id: 'course-1', name: 'Advanced Web Programming', code: 'CS101', lecturer: baseLecturers[0], schedule: 'Monday, 08:00 - 10:00', room: 'Lab 1', studentCount: 42, credits: 3, classType: 'Regular' },
  { id: 'course-2', name: 'Data Structures & Algorithms', code: 'CS102', lecturer: baseLecturers[1], schedule: 'Tuesday, 10:00 - 12:00', room: 'Room 201', studentCount: 38, credits: 4, classType: 'Executive' },
  { id: 'course-3', name: 'Artificial Intelligence', code: 'AI201', lecturer: baseLecturers[2], schedule: 'Wednesday, 13:00 - 15:00', room: 'Room 305', studentCount: 35, credits: 3, classType: 'Regular' },
  { id: 'course-4', name: 'Database Systems', code: 'DB301', lecturer: baseLecturers[0], schedule: 'Thursday, 09:00 - 11:00', room: 'Lab 2', studentCount: 45, credits: 2, classType: 'Regular' },
  { id: 'course-5', name: 'Computer Networks', code: 'CN401', lecturer: baseLecturers[1], schedule: 'Saturday, 10:00 - 12:00', room: 'Lab 3', studentCount: 32, credits: 2, classType: 'Weekend' },
];

export const lecturers: Lecturer[] = baseLecturers.map(lecturer => ({
  ...lecturer,
  courses: courses.filter(course => course.lecturer.id === lecturer.id)
}));

export const attendanceRecords: AttendanceRecord[] = [
  { id: 'att-1', course: courses[0], lecturer: lecturers[0], scanTime: new Date('2024-05-20T08:05:00'), status: 'Present' },
  { id: 'att-2', course: courses[1], lecturer: lecturers[1], scanTime: new Date('2024-05-21T10:15:00'), status: 'Late' },
  { id: 'att-3', course: courses[2], lecturer: lecturers[2], scanTime: new Date('2024-05-22T13:02:00'), status: 'Present' },
  { id: 'att-4', course: courses[3], lecturer: lecturers[0], scanTime: new Date('2024-05-23T09:00:00'), status: 'Present' },
  { id: 'att-5', course: courses[0], lecturer: lecturers[0], scanTime: new Date('2024-05-27T08:01:00'), status: 'Present' },
  { id: 'att-6', course: courses[4], lecturer: lecturers[1], scanTime: new Date('2024-05-25T10:05:00'), status: 'Present' },
];

export const students: Student[] = [
    { id: 'stu-1', studentId: '1234567890', name: 'Andi', major: 'Informatics Engineering', batchYear: 2022, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjQxNDEzMzd8MA&ixlib=rb-4.1.0&q=80&w=1080' }
];

export const exams: Exam[] = [
    { id: 'exam-1', courseName: 'Advanced Web Programming', courseCode: 'CS101', examType: 'Midterm', schedule: 'Friday, 08:00 - 10:00', room: 'Hall A' },
    { id: 'exam-2', courseName: 'Data Structures & Algorithms', courseCode: 'CS102', examType: 'Midterm', schedule: 'Friday, 10:30 - 12:30', room: 'Hall A' },
    { id: 'exam-3', courseName: 'Artificial Intelligence', courseCode: 'AI201', examType: 'Final', schedule: 'Saturday, 08:00 - 10:00', room: 'Room 401' },
];

export const supervisionRecords: SupervisionRecord[] = [
    { id: 'sup-1', exam: exams[0], supervisor: lecturers[2], scanTime: new Date('2024-06-07T08:00:00'), status: 'Present' },
    { id: 'sup-2', exam: exams[1], supervisor: lecturers[0], scanTime: new Date('2024-06-07T10:28:00'), status: 'Present' },
];

    