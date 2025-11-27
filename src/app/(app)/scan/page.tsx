'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScanLine, CheckCircle2, LoaderCircle } from 'lucide-react';

export default function ScanPage() {
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success'>('idle');

  const handleScan = () => {
    setScanStatus('scanning');
    setTimeout(() => {
      setScanStatus('success');
      setTimeout(() => {
        setScanStatus('idle');
      }, 3000); // Revert to idle after 3 seconds
    }, 1500); // Simulate scanning for 1.5 seconds
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Scan Attendance QR</CardTitle>
          <CardDescription>
            Point your device at the QR code to record attendance.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-10 space-y-6">
          <div className="relative w-64 h-64 flex items-center justify-center">
            {scanStatus === 'success' ? (
              <CheckCircle2 className="text-green-500 h-48 w-48 animate-in fade-in zoom-in-50 duration-500" />
            ) : (
                <>
                <ScanLine className="absolute text-muted-foreground/50 h-full w-full" />
                {scanStatus === 'scanning' && <div className="absolute inset-0 bg-primary/20 animate-pulse rounded-lg"></div>}
                </>
            )}
          </div>
          
          {scanStatus === 'idle' && (
            <Button size="lg" className="w-full" onClick={handleScan}>
              <ScanLine className="mr-2 h-5 w-5" />
              Start Scan
            </Button>
          )}

          {scanStatus === 'scanning' && (
            <Button size="lg" className="w-full" disabled>
              <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
              Scanning...
            </Button>
          )}

          {scanStatus === 'success' && (
            <Button size="lg" className="w-full bg-green-600 hover:bg-green-700" disabled>
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Attendance Recorded!
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
