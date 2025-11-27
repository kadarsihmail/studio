
import { PlaceHolderImages } from './placeholder-images';

export type Lecturer = {
  id: string;
  nidn: string;
  name: string;
  homebase: string;
  faculty: string;
  avatarUrl: string;
  courses: Course[];
};

export type Course = {
  id: string;
  name: string;
  code: string;
  lecturer: Omit<Lecturer, 'courses' | 'nidn' | 'homebase' | 'faculty'>;
  schedule: string;
  room: string;
};

export type AttendanceRecord = {
  id: string;
  course: Course;
  lecturer: Omit<Lecturer, 'courses' | 'nidn' | 'homebase' | 'faculty'>;
  scanTime: Date;
  status: "Present" | "Late";
};

const baseLecturers = [
  { id: 'lec-1', nidn: '0123456789', name: 'Dr. Aris', homebase: 'Teknik Informatika', faculty: 'Fakultas Ilmu Komputer', avatarUrl: PlaceHolderImages.find(img => img.id === 'lecturer-1')?.imageUrl || '' },
  { id: 'lec-2', nidn: '0987654321', name: 'Prof. Budi', homebase: 'Sistem Informasi', faculty: 'Fakultas Ilmu Komputer', avatarUrl: PlaceHolderImages.find(img => img.id === 'lecturer-2')?.imageUrl || '' },
  { id: 'lec-3', nidn: '1122334455', name: 'Dr. Citra', homebase: 'Teknik Komputer', faculty: 'Fakultas Teknik', avatarUrl: PlaceHolderImages.find(img => img.id === 'lecturer-3')?.imageUrl || '' },
] as const;


export const courses: Course[] = [
  { id: 'course-1', name: 'Pemrograman Web Lanjutan', code: 'CS101', lecturer: baseLecturers[0], schedule: 'Senin, 08:00 - 10:00', room: 'Lab 1' },
  { id: 'course-2', name: 'Struktur Data & Algoritma', code: 'CS102', lecturer: baseLecturers[1], schedule: 'Selasa, 10:00 - 12:00', room: 'Ruang 201' },
  { id: 'course-3', name: 'Kecerdasan Buatan', code: 'AI201', lecturer: baseLecturers[2], schedule: 'Rabu, 13:00 - 15:00', room: 'Ruang 305' },
  { id: 'course-4', name: 'Basis Data', code: 'DB301', lecturer: baseLecturers[0], schedule: 'Kamis, 09:00 - 11:00', room: 'Lab 2' },
  { id: 'course-5', name: 'Jaringan Komputer', code: 'CN401', lecturer: baseLecturers[1], schedule: 'Jumat, 10:00 - 12:00', room: 'Lab 3' },
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
  { id: 'att-6', course: courses[1], lecturer: lecturers[1], scanTime: new Date('2024-05-28T10:05:00'), status: 'Present' },
];
