import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { type Course, type AttendanceRecord, type Lecturer } from "./data";
import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSKSCredit = (course: Course): number => {
    if (course.classType === 'Weekend') {
      return course.credits;
    }
    // Regular and Executive
    switch (course.credits) {
      case 2: return 1;
      case 3: return 1.5;
      case 4: return 2;
      default: return 0;
    }
};

export type LecturerWeeklyStats = {
  id: string;
  name: string;
  avatarUrl: string;
  present: number;
  late: number;
  total: number;
  finalRecap: number;
  status: 'Full-time' | 'Part-time' | 'Contract';
};

export const calculateWeeklyLecturerStats = (lecturers: Lecturer[], attendanceRecords: AttendanceRecord[]): LecturerWeeklyStats[] => {
    const today = new Date();
    const startOfWeekDate = startOfWeek(today, { weekStartsOn: 1 });
    const endOfWeekDate = endOfWeek(today, { weekStartsOn: 1 });

    const weeklyAttendance = attendanceRecords.filter(record => 
      isWithinInterval(record.scanTime, { start: startOfWeekDate, end: endOfWeekDate })
    );

    const lecturerStats: LecturerWeeklyStats[] = lecturers.map(lecturer => {
        const lecturerRecords = weeklyAttendance.filter(rec => rec.lecturer.id === lecturer.id);
        const presentCount = lecturerRecords.filter(r => r.status === 'Present' || r.status === 'Late').length;
        const lateCount = lecturerRecords.filter(r => r.status === 'Late').length;
        
        const totalCredits = lecturerRecords.reduce((sum, record) => {
            if(record.status === 'Present' || record.status === 'Late') {
                return sum + getSKSCredit(record.course);
            }
            return sum;
        }, 0);

        let finalRecap: number;
        if (lecturer.status === 'Full-time' || lecturer.status === 'Part-time') {
          // Calculation for Full-time and Part-time lecturers
          finalRecap = (totalCredits * 2) - 16;
        } else { // Contract lecturers
          finalRecap = totalCredits;
        }

        return {
          id: lecturer.id,
          name: lecturer.name,
          avatarUrl: lecturer.avatarUrl,
          present: presentCount - lateCount,
          late: lateCount,
          total: lecturerRecords.length,
          finalRecap: finalRecap,
          status: lecturer.status,
        };
    });

    return lecturerStats;
}

    