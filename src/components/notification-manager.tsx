'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { courses } from '@/lib/data';
import { BellRing, BellOff } from 'lucide-react';

const DAY_MAP: { [key: string]: number } = {
  'minggu': 0,
  'senin': 1,
  'selasa': 2,
  'rabu': 3,
  'kamis': 4,
  'jumat': 5,
  'sabtu': 6,
};

export default function NotificationManager() {
  const { toast } = useToast();

  useEffect(() => {
    const notifiedStartTimes = new Set<string>();
    const notifiedEndTimes = new Set<string>();

    const checkSchedule = () => {
      const now = new Date();
      const currentDay = now.getDay();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      courses.forEach((course) => {
        try {
          const [dayStr, timeRange] = course.schedule.split(', ');
          const dayIndex = DAY_MAP[dayStr.toLowerCase()];
          const [startTime, endTime] = timeRange.split(' - ');
          
          const startKey = `${course.id}-${startTime}`;
          const endKey = `${course.id}-${endTime}`;

          if (currentDay === dayIndex) {
            // Start time notification
            if (currentTime === startTime && !notifiedStartTimes.has(startKey)) {
              toast({
                title: (
                  <div className="flex items-center gap-2">
                    <BellRing className="h-5 w-5 text-primary" /> Waktunya Mengajar!
                  </div>
                ),
                description: `Kelas ${course.name} dimulai sekarang di ${course.room}.`,
              });
              notifiedStartTimes.add(startKey);
            }

            // End time notification
            if (currentTime === endTime && !notifiedEndTimes.has(endKey)) {
              toast({
                 title: (
                  <div className="flex items-center gap-2">
                    <BellOff className="h-5 w-5" /> Waktu Habis
                  </div>
                ),
                description: `Kelas ${course.name} telah selesai.`,
              });
              notifiedEndTimes.add(endKey);
            }
          }
        } catch (error) {
          console.error("Error parsing schedule for course:", course.name, error);
        }
      });
    };

    const intervalId = setInterval(checkSchedule, 60000); // Check every minute

    // Initial check
    checkSchedule();

    return () => clearInterval(intervalId);
  }, [toast]);

  return null;
}
