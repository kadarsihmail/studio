
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
    required_error: 'Pilih jenis surat terlebih dahulu.',
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
    { value: 'keaslian-ijazah', label: 'Surat Keterangan Keaslian Ijazah' },
    { value: 'kesalahan-penulisan', label: 'Surat Keterangan Kesalahan Penulisan' },
];

export default function SuratPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      letterType: '',
    },
  });

  const selectedLetterType = form.watch('letterType');

  function onSubmit(data: FormValues) {
    console.log('Form Submitted:', data);
    // Here you would typically handle the letter generation logic
    alert('Fungsi pembuatan surat belum diimplementasikan. Data form: ' + JSON.stringify(data, null, 2));
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
              <FormLabel>Pilih Mahasiswa</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Cari dan pilih mahasiswa..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name} ({student.nim})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {selectedLetterType === 'keaslian-ijazah' && (
          <>
            <FormField
              control={form.control}
              name="diplomaNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Ijazah</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: UNMA-012345" {...field} />
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
                  <FormLabel>Tanggal Lulus</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        {selectedLetterType === 'kesalahan-penulisan' && (
          <>
            <FormField
              control={form.control}
              name="incorrectDocument"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dokumen yang Salah</FormLabel>
                   <FormControl>
                    <Input placeholder="Contoh: Ijazah, Transkrip Nilai" {...field} />
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
                  <FormLabel>Kesalahan Penulisan</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Salah penulisan nama" {...field} />
                  </FormControl>
                   <FormDescription>Jelaskan secara singkat letak kesalahannya.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="correctInformation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Perbaikan yang Benar</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Nama seharusnya John Doe" {...field} />
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
            <CardTitle>Administrasi Surat</CardTitle>
            <CardDescription>
              Buat berbagai jenis surat keterangan untuk mahasiswa.
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
                      <FormLabel>Jenis Surat</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis surat yang akan dibuat" />
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
                  <Button type="submit">Buat Surat</Button>
                </CardFooter>
              )}
            </form>
          </Form>
        </Card>
    </div>
  );
}
