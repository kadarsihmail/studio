
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Book,
  CalendarCheck,
  CheckCircle,
  Clock,
  FileText,
  QrCode,
  Users,
  XCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { attendanceRecords, courses, lecturers } from "@/lib/data";
import { format, startOfWeek, endOfWeek, isWithinInterval } from "date-fns";

type LecturerWeeklyStats = {
  id: string;
  name: string;
  avatarUrl: string;
  present: number;
  late: number;
  total: number;
  finalRecap: number;
};

export default function Dashboard() {
  const totalScans = attendanceRecords.length;
  const onTimeScans = attendanceRecords.filter(r => r.status === 'Present').length;
  const attendanceRate = totalScans > 0 ? (onTimeScans / totalScans) * 100 : 0;

  const today = new Date();
  const startOfWeekDate = startOfWeek(today, { weekStartsOn: 1 });
  const endOfWeekDate = endOfWeek(today, { weekStartsOn: 1 });

  const weeklyAttendance = attendanceRecords.filter(record => 
    isWithinInterval(record.scanTime, { start: startOfWeekDate, end: endOfWeekDate })
  );

  const lecturerStats: LecturerWeeklyStats[] = lecturers.map(lecturer => {
    const lecturerRecords = weeklyAttendance.filter(rec => rec.lecturer.id === lecturer.id);
    const present = lecturerRecords.filter(r => r.status === 'Present' || r.status === 'Late').length; // Count present and late as attendance for the calculation
    const late = lecturerRecords.filter(r => r.status === 'Late').length;
    const finalRecap = (present * 2) - 16;

    return {
      id: lecturer.id,
      name: lecturer.name,
      avatarUrl: lecturer.avatarUrl,
      present: lecturerRecords.filter(r => r.status === 'Present').length,
      late: late,
      total: lecturerRecords.length,
      finalRecap: finalRecap,
    };
  });


  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Classes Today
              </CardTitle>
              <CalendarCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                +2 from yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Attendance Rate
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                Based on {totalScans} scans
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Scans</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{totalScans}</div>
              <p className="text-xs text-muted-foreground">
                in the last week
              </p>
            </CardContent>
          </Card>
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Session</CardTitle>
                <QrCode className="h-4 w-4 text-primary-foreground" />
            </CardHeader>
            <CardContent>
                <Link href="/generate-qr">
                    <Button variant="secondary" className="w-full">
                        Generate QR Code <ArrowUpRight className="h-4 w-4 ml-2" />
                    </Button>
                </Link>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Recent Attendance</CardTitle>
                <CardDescription>
                  Recent lecturer attendance scans from today.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/reports">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lecturer</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceRecords.slice(0, 5).map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={record.lecturer.avatarUrl} alt="Avatar" data-ai-hint="man portrait"/>
                              <AvatarFallback>{record.lecturer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{record.lecturer.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{record.course.name}</div>
                        <div className="text-sm text-muted-foreground md:inline">
                          {record.course.code}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant={record.status === 'Present' ? 'default' : 'destructive'}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {format(record.scanTime, 'HH:mm:ss')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Classes</CardTitle>
              <CardDescription>These classes are scheduled for today.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {courses.slice(0, 4).map((course, index) => (
                <div className="flex items-center gap-4" key={course.id}>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={course.lecturer.avatarUrl} alt="Avatar" data-ai-hint="person" />
                    <AvatarFallback>{course.lecturer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1 text-sm">
                    <p className="font-medium leading-none">
                      {course.name}
                    </p>
                    <p className="text-muted-foreground flex items-center gap-1"><Book className="h-3 w-3" /> {course.lecturer.name}</p>
                     <p className="text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" /> {course.studentCount} Mahasiswa</p>
                  </div>
                  <div className="ml-auto font-medium flex items-center gap-1 text-sm">
                    <Clock className="h-3 w-3" />
                    {course.schedule.split(', ')[1]}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Weekly Attendance Recap</CardTitle>
                    <CardDescription>
                        Attendance summary for each lecturer this week. ({format(startOfWeekDate, 'd MMM')} - {format(endOfWeekDate, 'd MMM')})
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {lecturerStats.map(lecturer => (
                            <Card key={lecturer.id} className="flex flex-col">
                                <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={lecturer.avatarUrl} alt={lecturer.name} data-ai-hint="person" />
                                        <AvatarFallback>{lecturer.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-lg">{lecturer.name}</CardTitle>
                                        <CardDescription>{lecturer.total} sessions this week</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow grid grid-cols-2 gap-4 pt-2">
                                     <div className="flex items-center gap-2 text-green-600">
                                        <CheckCircle className="h-5 w-5" />
                                        <div>
                                            <div className="font-bold text-lg">{lecturer.present}</div>
                                            <div className="text-sm text-muted-foreground">Present</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-destructive">
                                        <XCircle className="h-5 w-5" />
                                        <div>
                                            <div className="font-bold text-lg">{lecturer.late}</div>
                                            <div className="text-sm text-muted-foreground">Late</div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="bg-muted/50 p-3 mt-4">
                                    <div className="flex items-center gap-2 text-sm w-full">
                                        <FileText className="h-4 w-4 text-primary" />
                                        <span className="font-medium text-muted-foreground">Rekap Akhir:</span>
                                        <span className={`font-bold ml-auto ${lecturer.finalRecap >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {lecturer.finalRecap}
                                        </span>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
