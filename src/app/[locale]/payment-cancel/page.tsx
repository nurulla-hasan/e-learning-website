'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

const Cancel = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <XCircle className="h-16 w-16 text-red-500 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Payment Cancelled</h2>
      <p className="text-gray-600 mb-6">
        Your transaction was not completed. No worries—your account is safe and no charges were made.
      </p>
      <Button onClick={() => router.push('/')} className="bg-red-500 hover:bg-red-600 text-white">
        Go Back Home
      </Button>
    </div>
  );
};

export default Cancel;