
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { students } from '@/lib/data';

const formSchema = z.object({
  letterType: z.string({
    required_error: 'Please select a letter type.',
  }),
  studentId: z.string().optional(),
  // Fields for Certificate of Authenticity
  diplomaNumber: z.string().optional(),
  graduationDate: z.string().optional(),
  // Fields for Correction Letter
  incorrectDocument: z.string().optional(),
  errorDescription: z.string().optional(),
  correctInformation: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const letterTypes = [
    { value: 'authenticity-certificate', label: 'Certificate of Authenticity' },
    { value: 'correction-letter', label: 'Letter of Correction' },
];

export default function LetterAdministrationPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      letterType: '',
      studentId: '',
      diplomaNumber: '',
      graduationDate: '',
      incorrectDocument: '',
      errorDescription: '',
      correctInformation: '',
    },
  });

  const selectedLetterType = form.watch('letterType');

  function onSubmit(data: FormValues) {
    console.log('Form Submitted:', data);
    // Here you would typically handle the letter generation logic
    alert('Letter generation functionality is not yet implemented. Form data: ' + JSON.stringify(data, null, 2));
  }

  const renderFormFields = () => {
    if (!selectedLetterType) return null;

    return (
      <>
        <FormField
          control={form.control}
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Student</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Search and select a student..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name} ({student.studentId})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {selectedLetterType === 'authenticity-certificate' && (
          <>
            <FormField
              control={form.control}
              name="diplomaNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diploma Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., UNIV-012345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="graduationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Graduation Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        {selectedLetterType === 'correction-letter' && (
          <>
            <FormField
              control={form.control}
              name="incorrectDocument"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Incorrect Document</FormLabel>
                   <FormControl>
                    <Input placeholder="e.g., Diploma, Transcript" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="errorDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Error Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Misspelling of name" {...field} />
                  </FormControl>
                   <FormDescription>Briefly describe the error.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="correctInformation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correct Information</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., The name should be John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
      </>
    );
  };

  return (
    <div className="container mx-auto py-10">
        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle>Letter Administration</CardTitle>
            <CardDescription>
              Create various types of official letters for students.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="letterType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Letter Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a letter type to create" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {letterTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {renderFormFields()}
              </CardContent>
              {selectedLetterType && (
                <CardFooter>
                  <Button type="submit">Create Letter</Button>
                </CardFooter>
              )}
            </form>
          </Form>
        </Card>
    </div>
  );
}

    