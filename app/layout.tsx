import { UserProvider } from 'context/user-context';
import { GeistSans } from 'geist/font/sans';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={GeistSans.variable}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <UserProvider>
          <main>{children}</main>
          <Toaster closeButton />
        </UserProvider>
      </body>
    </html>
  );
}
