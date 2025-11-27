import { PlaceHolderImages } from './placeholder-images';

export type Lecturer = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type Course = {
  id: string;
  name: string;
  code: string;
  lecturer: Lecturer;
  schedule: string;
  room: string;
};

export type AttendanceRecord = {
  id: string;
  course: Course;
  lecturer: Lecturer;
  scanTime: Date;
  status: "Present" | "Late";
};

const lecturers: Lecturer[] = [
  { id: 'lec-1', name: 'Dr. Aris', avatarUrl: PlaceHolderImages.find(img => img.id === 'lecturer-1')?.imageUrl || '' },
  { id: 'lec-2', name: 'Prof. Budi', avatarUrl: PlaceHolderImages.find(img => img.id === 'lecturer-2')?.imageUrl || '' },
  { id: 'lec-3', name: 'Dr. Citra', avatarUrl: PlaceHolderImages.find(img => img.id === 'lecturer-3')?.imageUrl || '' },
];

export const courses: Course[] = [
  { id: 'course-1', name: 'Pemrograman Web Lanjutan', code: 'CS101', lecturer: lecturers[0], schedule: 'Senin, 08:00 - 10:00', room: 'Lab 1' },
  { id: 'course-2', name: 'Struktur Data & Algoritma', code: 'CS102', lecturer: lecturers[1], schedule: 'Selasa, 10:00 - 12:00', room: 'Ruang 201' },
  { id: 'course-3', name: 'Kecerdasan Buatan', code: 'AI201', lecturer: lecturers[2], schedule: 'Rabu, 13:00 - 15:00', room: 'Ruang 305' },
  { id: 'course-4', name: 'Basis Data', code: 'DB301', lecturer: lecturers[0], schedule: 'Kamis, 09:00 - 11:00', room: 'Lab 2' },
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: 'att-1', course: courses[0], lecturer: lecturers[0], scanTime: new Date('2024-05-20T08:05:00'), status: 'Present' },
  { id: 'att-2', course: courses[1], lecturer: lecturers[1], scanTime: new Date('2024-05-21T10:15:00'), status: 'Late' },
  { id: 'att-3', course: courses[2], lecturer: lecturers[2], scanTime: new Date('2024-05-22T13:02:00'), status: 'Present' },
  { id: 'att-4', course: courses[3], lecturer: lecturers[0], scanTime: new Date('2024-05-23T09:00:00'), status: 'Present' },
  { id: 'att-5', course: courses[0], lecturer: lecturers[0], scanTime: new Date('2024-05-27T08:01:00'), status: 'Present' },
  { id: 'att-6', course: courses[1], lecturer: lecturers[1], scanTime: new Date('2024-05-28T10:05:00'), status: 'Present' },
];
