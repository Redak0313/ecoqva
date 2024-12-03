'use client';

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { AtSymbolIcon, ExclamationCircleIcon, KeyIcon } from '@heroicons/react/24/outline';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { register } from '../lib/actions';
import { Button } from './button';

export default function SignUpForm() {
  const [message, formAction, isPending] = useActionState(register, undefined);
  const router = useRouter();

  useEffect(() => {
    if (message?.status === 201) {
      toast(message.message, {
        id: 'welcome-toast',
        duration: 1200,
        onDismiss: () => router.push('/login'),
        onAutoClose: () => router.push('/login')
      });
    } else if (message?.status && message.status >= 400) {
      toast.error(message.message, {
        id: 'error-toast'
      });
    }
  }, [message]);

  return (
    <form action={formAction}>
      <div className="flex-1 rounded-lg bg-black/30 px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl`}>
          Crea una cuenta para acceder a las reservas en la plataforma.
        </h1>
        <div className="w-full">
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium" htmlFor="password">
              Nombre
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                placeholder="Introduce tu nombre"
                required
                minLength={1}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
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
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium" htmlFor="password">
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password-confirm"
                type="password"
                name="password-confirm"
                placeholder="Confirma tu contraseña"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Crear cuenta <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
          {message?.message.includes('Error') && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{message.message}</p>
            </>
          )}
        </div>
        <div className="flex items-center justify-center">
          <a href="/login" className="text-center text-sm hover:underline">
            Iniciar sesión
          </a>
        </div>
      </div>
    </form>
  );
}
