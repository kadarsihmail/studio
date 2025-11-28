'use client';

import * as React from 'react';
import { Calendar as CalendarIcon, FileDown, ListFilter } from 'lucide-react';
import { addDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import * as XLSX from 'xlsx';

import { cn, calculateWeeklyLecturerStats } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { attendanceRecords, courses, lecturers } from '@/lib/data';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ReportsPage() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });
  const [courseFilter, setCourseFilter] = React.useState<string>('all');

  const filteredRecords = attendanceRecords.filter((record) => {
    const recordDate = record.scanTime;
    const isAfterFrom = date?.from ? recordDate >= date.from : true;
    const isBeforeTo = date?.to ? recordDate <= addDays(date.to, 1) : true; // include the whole "to" day
    const courseMatches = courseFilter === 'all' || record.course.id === courseFilter;
    return isAfterFrom && isBeforeTo && courseMatches;
  });

  const handleExport = () => {
    const lecturerStats = calculateWeeklyLecturerStats(lecturers, attendanceRecords);

    const title = "Lecturer Recap Report";
    const headers = ["No", "Lecturer Name", "Total Recap"];
    
    const dataToExport = lecturerStats.map((stat, index) => ({
        No: index + 1,
        "Lecturer Name": stat.name,
        "Total Recap": stat.finalRecap.toFixed(1)
    }));

    const worksheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(worksheet, [[title]], { origin: "A1" });
    XLSX.utils.sheet_add_json(worksheet, dataToExport, { origin: "A3", skipHeader: false, header: headers });
    
    // Set column widths
    worksheet['!cols'] = [
        { wch: 5 }, // No
        { wch: 30 }, // Lecturer Name
        { wch: 15 }, // Total Recap
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Recap Report");

    XLSX.writeFile(workbook, `lecturer_recap_report_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Records</CardTitle>
        <CardDescription>
          View and export lecturer attendance records.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={'outline'}
                  className={cn(
                    'w-[300px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd, y')} -{' '}
                        {format(date.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Filter by course..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    {courses.map(course => (
                        <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Present
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Late</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-10 gap-1" onClick={handleExport}>
              <FileDown className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lecturer</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Scan Time</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={record.lecturer.avatarUrl}
                            alt="Avatar"
                            data-ai-hint="person"
                          />
                          <AvatarFallback>
                            {record.lecturer.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{record.lecturer.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {record.course.name}
                      <p className="text-xs text-muted-foreground">{record.course.code}</p>
                    </TableCell>
                    <TableCell>{format(record.scanTime, 'PPP')}</TableCell>
                    <TableCell>{format(record.scanTime, 'p')}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          record.status === 'Present' ? 'secondary' : 'destructive'
                        }
                        className={record.status === 'Present' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : ''}
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

    