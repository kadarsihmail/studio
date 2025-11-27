
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { exams, supervisionRecords } from "@/lib/data";
import { CheckCircle, Clock, ShieldAlert } from "lucide-react";
import { format } from "date-fns";

export default function SupervisionPage() {
    
    // Join exams with supervision records
    const supervisionData = exams.map(exam => {
        const record = supervisionRecords.find(r => r.exam.id === exam.id);
        return {
            ...exam,
            supervisor: record ? record.supervisor : null,
            scanTime: record ? record.scanTime : null,
            status: record ? record.status : 'Belum Hadir',
        };
    });

    return (
        <div className="container mx-auto py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Jadwal Pengawasan Ujian</CardTitle>
                    <CardDescription>
                        Daftar jadwal pengawasan ujian tengah semester dan ujian akhir semester.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Mata Kuliah</TableHead>
                                <TableHead>Jadwal & Ruang</TableHead>
                                <TableHead>Jenis Ujian</TableHead>
                                <TableHead>Pengawas</TableHead>
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
                                        <Badge variant={item.examType === 'UTS' ? 'secondary' : 'default'}>{item.examType}</Badge>
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
                                            <span className="text-muted-foreground">Belum ada</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {item.status === 'Hadir' ? (
                                            <div className="flex items-center justify-end gap-2 text-green-600">
                                                <CheckCircle className="h-4 w-4" />
                                                <span>Hadir ({format(item.scanTime!, 'HH:mm')})</span>
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
        </div>
    )
}
