
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { lecturers, courses } from "@/lib/data";
import { Building, Edit, GraduationCap, Hash, Mail, User as UserIcon, BookOpen, Users } from "lucide-react";

export default function ProfilePage() {
    // For demonstration, we'll use the first lecturer.
    // In a real app, you would fetch the currently logged-in user.
    const lecturer = lecturers[0];

    if (!lecturer) {
        return <div>Lecturer not found.</div>;
    }
    
    const lecturerCourses = courses.filter(c => c.lecturer.id === lecturer.id);

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader className="items-center text-center">
                            <Avatar className="h-28 w-28 mb-4">
                                <AvatarImage src={lecturer.avatarUrl} alt={lecturer.name} data-ai-hint="person" />
                                <AvatarFallback>{lecturer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-2xl">{lecturer.name}</CardTitle>
                            <CardDescription>Lecturer</CardDescription>
                             <Button size="sm" variant="outline" className="mt-4">
                                <Edit className="mr-2 h-4 w-4" /> Edit Profile
                            </Button>
                        </CardHeader>
                        <CardContent>
                           <Separator className="my-4" />
                            <div className="space-y-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-3">
                                    <Hash className="h-5 w-5 text-primary" />
                                    <span>ID: {lecturer.lecturerId}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Building className="h-5 w-5 text-primary" />
                                    <span>{lecturer.faculty}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <GraduationCap className="h-5 w-5 text-primary" />
                                    <span>Department: {lecturer.department}</span>
                                </div>
                                 <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-primary" />
                                    <span>{lecturer.name.toLowerCase().replace('dr. ', '').replace('prof. ', '').replace(' ', '.')}@example.com</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Courses Taught</CardTitle>
                            <CardDescription>List of courses taught by {lecturer.name}.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {lecturerCourses.map((course) => (
                                <Card key={course.id} className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold text-primary">{course.name}</p>
                                            <p className="text-sm text-muted-foreground">{course.code}</p>
                                        </div>
                                        <Badge variant="secondary">{course.schedule}</Badge>
                                    </div>
                                    <Separator className="my-3"/>
                                     <div className="text-sm text-muted-foreground flex items-center justify-between">
                                       <p>Room: {course.room}</p>
                                       <div className="flex items-center gap-1">
                                            <Users className="h-4 w-4" />
                                            <span>{course.studentCount} Students</span>
                                       </div>
                                    </div>
                                </Card>
                           ))}
                           {lecturerCourses.length === 0 && (
                               <div className="text-center text-muted-foreground py-8">
                                   <BookOpen className="mx-auto h-12 w-12" />
                                   <p className="mt-2">No courses taught yet.</p>
                                </div>
                           )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

    