
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { exams, supervisionRecords } from "@/lib/data";
import { CheckCircle, Clock, ShieldAlert, UserCheck } from "lucide-react";
import { format } from "date-fns";

export default function SupervisionPage() {
    
    // Join exams with supervision records for the main schedule table
    const supervisionData = exams.map(exam => {
        const record = supervisionRecords.find(r => r.exam.id === exam.id);
        return {
            ...exam,
            supervisor: record ? record.supervisor : null,
            scanTime: record ? record.scanTime : null,
            status: record ? record.status : 'Not Present',
        };
    });

    // Calculate supervisor recap data
    const supervisorRecap = supervisionRecords.reduce((acc, record) => {
        if (record.status === 'Present') {
            const existing = acc.find(item => item.id === record.supervisor.id);
            if (existing) {
                existing.count += 1;
            } else {
                acc.push({
                    id: record.supervisor.id,
                    name: record.supervisor.name,
                    avatarUrl: record.supervisor.avatarUrl,
                    count: 1
                });
            }
        }
        return acc;
    }, [] as { id: string; name: string; avatarUrl: string; count: number }[]);

    return (
        <div className="container mx-auto py-8">
            <div className="grid gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Exam Supervision Schedule</CardTitle>
                        <CardDescription>
                            Schedule for midterm and final exam supervisions.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Schedule & Room</TableHead>
                                    <TableHead>Exam Type</TableHead>
                                    <TableHead>Supervisor</TableHead>
                                    <TableHead className="text-right">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {supervisionData.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <div className="font-medium">{item.courseName}</div>
                                            <div className="text-sm text-muted-foreground">{item.courseCode}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" /> {item.schedule}, {item.room}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={item.examType === 'Midterm' ? 'secondary' : 'default'}>{item.examType}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            {item.supervisor ? (
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-9 w-9">
                                                    <AvatarImage src={item.supervisor.avatarUrl} alt="Avatar" data-ai-hint="person"/>
                                                    <AvatarFallback>{item.supervisor.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="font-medium">{item.supervisor.name}</div>
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground">Unassigned</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {item.status === 'Present' ? (
                                                <div className="flex items-center justify-end gap-2 text-green-600">
                                                    <CheckCircle className="h-4 w-4" />
                                                    <span>Present ({format(item.scanTime!, 'HH:mm')})</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-end gap-2 text-destructive">
                                                    <ShieldAlert className="h-4 w-4" />
                                                    <span>{item.status}</span>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Supervisor Attendance Recap</CardTitle>
                        <CardDescription>
                            Total attendance for each supervisor during exams.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80px]">No.</TableHead>
                                    <TableHead>Supervisor Name</TableHead>
                                    <TableHead className="text-right">Total Present</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {supervisorRecap.length > 0 ? supervisorRecap.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarImage src={item.avatarUrl} alt="Avatar" data-ai-hint="person" />
                                                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="font-medium">{item.name}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2 font-semibold">
                                                <UserCheck className="h-4 w-4 text-primary" />
                                                <span>{item.count}</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="h-24 text-center">
                                            No supervisor attendance data yet.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

    