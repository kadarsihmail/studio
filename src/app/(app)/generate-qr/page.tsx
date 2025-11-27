"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { courses, type Course } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Clock, DoorClosed, User } from "lucide-react";

export default function GenerateQrPage() {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  
  const qrCodePlaceholder = PlaceHolderImages.find(p => p.id === 'qr-code-placeholder');

  const selectedCourse = courses.find((c) => c.id === selectedCourseId);

  const handleCourseChange = (courseId: string) => {
    setSelectedCourseId(courseId);
  };
  
  const handleRegenerate = () => {
    // In a real app, this would trigger a new unique QR code generation
    console.log("Regenerating QR Code for", selectedCourse?.name);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-2xl">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Generate Session QR Code</CardTitle>
            <CardDescription>
              Select a course to generate a unique QR code for the attendance session.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Select onValueChange={handleCourseChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course..." />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name} ({course.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedCourse && qrCodePlaceholder && (
              <Card className="overflow-hidden shadow-lg border-primary/20">
                <div className="bg-primary p-4 text-center text-primary-foreground">
                    <h3 className="font-bold text-lg">{selectedCourse.name}</h3>
                    <p className="text-sm">{selectedCourse.code}</p>
                </div>
                <div className="flex flex-col items-center justify-center p-6 gap-6">
                  <div className="p-2 bg-white rounded-lg shadow-md">
                    <Image
                      src={`${qrCodePlaceholder.imageUrl}&data=${encodeURIComponent(`KaryaCheck|${selectedCourse.id}|${new Date().toISOString()}`)}`}
                      alt="QR Code for session"
                      width={250}
                      height={250}
                      data-ai-hint="qr code"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground w-full">
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary"/> <span>{selectedCourse.lecturer.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary"/> <span>{selectedCourse.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <DoorClosed className="h-4 w-4 text-primary"/> <span>{selectedCourse.room}</span>
                    </div>
                  </div>
                </div>
                <CardFooter className="bg-muted/50 p-4">
                  <Button onClick={handleRegenerate} className="w-full" variant="outline">Regenerate Code</Button>
                </CardFooter>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
