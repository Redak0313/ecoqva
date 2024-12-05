import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import '../globals.css';

export default async function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <>{children}</>
      <Toaster closeButton />
    </>
  );
}
