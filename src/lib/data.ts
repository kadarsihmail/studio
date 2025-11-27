
import { PlaceHolderImages } from './placeholder-images';

export type Lecturer = {
  id: string;
  nidn: string;
  name: string;
  homebase: string;
  faculty: string;
  avatarUrl: string;
  courses: Course[];
  status: 'Tetap' | 'Non Daily' | 'LB';
};

export type Course = {
  id: string;
  name: string;
  code: string;
  lecturer: Omit<Lecturer, 'courses' | 'nidn' | 'homebase' | 'faculty' | 'status'>;
  schedule: string;
  room: string;
  studentCount: number;
  sks: 2 | 3 | 4;
  classType: 'Reguler' | 'Karyawan' | 'Jumat-Sabtu';
};

export type AttendanceRecord = {
  id: string;
  course: Course;
  lecturer: Omit<Lecturer, 'courses' | 'nidn' | 'homebase' | 'faculty' | 'status'>;
  scanTime: Date;
  status: "Present" | "Late";
};

export type Student = {
  id: string;
  nim: string;
  name: string;
  programStudy: string;
  angkatan: number;
  avatarUrl: string;
};

export type Exam = {
    id: string;
    courseName: string;
    courseCode: string;
    examType: 'UTS' | 'UAS';
    schedule: string;
    room: string;
};

export type SupervisionRecord = {
    id: string;
    exam: Exam;
    supervisor: Omit<Lecturer, 'courses' | 'nidn' | 'homebase' | 'faculty' | 'status'>;
    scanTime: Date;
    status: 'Hadir';
};


const baseLecturers = [
  { id: 'lec-1', nidn: '0123456789', name: 'Dr. Aris', homebase: 'Teknik Informatika', faculty: 'Fakultas Ilmu Komputer', avatarUrl: PlaceHolderImages.find(img => img.id === 'lecturer-1')?.imageUrl || '', status: 'Tetap' as const },
  { id: 'lec-2', nidn: '0987654321', name: 'Prof. Budi', homebase: 'Sistem Informasi', faculty: 'Fakultas Ilmu Komputer', avatarUrl: PlaceHolderImages.find(img => img.id === 'lecturer-2')?.imageUrl || '', status: 'LB' as const },
  { id: 'lec-3', nidn: '1122334455', name: 'Dr. Citra', homebase: 'Teknik Komputer', faculty: 'Fakultas Teknik', avatarUrl: PlaceHolderImages.find(img => img.id === 'lecturer-3')?.imageUrl || '', status: 'Non Daily' as const },
] as const;


export const courses: Course[] = [
  { id: 'course-1', name: 'Pemrograman Web Lanjutan', code: 'CS101', lecturer: baseLecturers[0], schedule: 'Senin, 08:00 - 10:00', room: 'Lab 1', studentCount: 42, sks: 3, classType: 'Reguler' },
  { id: 'course-2', name: 'Struktur Data & Algoritma', code: 'CS102', lecturer: baseLecturers[1], schedule: 'Selasa, 10:00 - 12:00', room: 'Ruang 201', studentCount: 38, sks: 4, classType: 'Karyawan' },
  { id: 'course-3', name: 'Kecerdasan Buatan', code: 'AI201', lecturer: baseLecturers[2], schedule: 'Rabu, 13:00 - 15:00', room: 'Ruang 305', studentCount: 35, sks: 3, classType: 'Reguler' },
  { id: 'course-4', name: 'Basis Data', code: 'DB301', lecturer: baseLecturers[0], schedule: 'Kamis, 09:00 - 11:00', room: 'Lab 2', studentCount: 45, sks: 2, classType: 'Reguler' },
  { id: 'course-5', name: 'Jaringan Komputer', code: 'CN401', lecturer: baseLecturers[1], schedule: 'Sabtu, 10:00 - 12:00', room: 'Lab 3', studentCount: 32, sks: 2, classType: 'Jumat-Sabtu' },
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
    { id: 'stu-1', nim: '1234567890', name: 'Andi', programStudy: 'Teknik Informatika', angkatan: 2022, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjQxNDEzMzd8MA&ixlib=rb-4.1.0&q=80&w=1080' }
];

export const exams: Exam[] = [
    { id: 'exam-1', courseName: 'Pemrograman Web Lanjutan', courseCode: 'CS101', examType: 'UTS', schedule: 'Jumat, 08:00 - 10:00', room: 'Aula' },
    { id: 'exam-2', courseName: 'Struktur Data & Algoritma', courseCode: 'CS102', examType: 'UTS', schedule: 'Jumat, 10:30 - 12:30', room: 'Aula' },
    { id: 'exam-3', courseName: 'Kecerdasan Buatan', courseCode: 'AI201', examType: 'UAS', schedule: 'Sabtu, 08:00 - 10:00', room: 'Ruang 401' },
];

export const supervisionRecords: SupervisionRecord[] = [
    { id: 'sup-1', exam: exams[0], supervisor: lecturers[2], scanTime: new Date('2024-06-07T08:00:00'), status: 'Hadir' },
    { id: 'sup-2', exam: exams[1], supervisor: lecturers[0], scanTime: new Date('2024-06-07T10:28:00'), status: 'Hadir' },
];

