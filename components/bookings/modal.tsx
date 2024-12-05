'use client';

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useBookings } from 'app/hooks/useBookings';
import { Cart } from 'lib/shopify/types';

interface ModalProps {
  open: boolean;
  setOpenAction: (open: boolean) => void;
  title: string;
  description: string;
  cart: Cart | undefined;
}

export default function BookingsModal({
  open,
  setOpenAction,
  title,
  description,
  cart
}: ModalProps) {
  const { bookItems } = useBookings();
  return (
    <Dialog open={open} onClose={setOpenAction} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 dark:bg-gray-950 dark:text-white">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <ShoppingBagIcon aria-hidden="true" className="size-6 text-blue-600" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-white">
                    {title}
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-300">{description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-800">
              <button
                type="button"
                onClick={() => setOpenAction(false)}
                className="inline-flex w-full justify-center rounded-full bg-transparent px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:ml-3 sm:w-auto"
              >
                Cancelar
              </button>
              <button
                type="button"
                data-autofocus
                onClick={async () => {
                  await bookItems(cart!);
                  setOpenAction(false);
                }}
                className="mt-3 inline-flex w-full justify-center rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 sm:mt-0 sm:w-auto"
              >
                Confirmar reserva
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
