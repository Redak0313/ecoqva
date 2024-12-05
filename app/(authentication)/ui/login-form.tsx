'use client';

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { AtSymbolIcon, ExclamationCircleIcon, KeyIcon } from '@heroicons/react/24/outline';

import { useUser } from 'context/user-context';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { authenticate } from '../lib/actions';
import { Button } from './button';

export default function LoginForm() {
  const { setUser } = useUser();
  const [data, formAction, isPending] = useActionState(authenticate, undefined);
  const router = useRouter();

  useEffect(() => {
    if (data?.message?.includes('sesión')) {
      setUser({ email: data.email, id: null, name: null });

      toast(data.message, {
        id: 'welcome-toast',
        duration: 1200,
        onDismiss: () => router.push('/'),
        onAutoClose: () => router.push('/')
      });
    }
  }, [data]);

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-black/30 px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl`}>Por favor inicie sesión para continuar.</h1>
        <div className="w-full">
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Introduce tu email"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium" htmlFor="password">
              Contraseña
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Introduce tu contraseña"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Iniciar <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
          {data?.message?.includes('Error') && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{data.message}</p>
            </>
          )}
        </div>
        <div className="flex items-center justify-center">
          <a href="/register" className="text-center text-sm hover:underline">
            Crear cuenta
          </a>
        </div>
      </div>
    </form>
  );
}
