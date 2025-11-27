import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { students } from "@/lib/data";
import { Edit, Hash, School, Calendar, User as UserIcon } from "lucide-react";

export default function StudentProfilePage() {
    // For demonstration, we'll use the first student.
    // In a real app, you would fetch the currently logged-in user.
    const student = students[0];

    if (!student) {
        return <div>Student not found.</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <div className="mx-auto max-w-xl">
                <Card>
                    <CardHeader className="items-center text-center">
                        <Avatar className="h-28 w-28 mb-4">
                            <AvatarImage src={student.avatarUrl} alt={student.name} data-ai-hint="person portrait" />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-2xl">{student.name}</CardTitle>
                        <CardDescription>Mahasiswa</CardDescription>
                         <Button size="sm" variant="outline" className="mt-4">
                            <Edit className="mr-2 h-4 w-4" /> Edit Profile
                        </Button>
                    </CardHeader>
                    <CardContent>
                       <Separator className="my-4" />
                        <div className="space-y-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-3">
                                <Hash className="h-5 w-5 text-primary" />
                                <span>NIM: {student.nim}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <School className="h-5 w-5 text-primary" />
                                <span>{student.programStudy}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="h-5 w-5 text-primary" />
                                <span>Angkatan: {student.angkatan}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
