import { ArrowRightIcon, PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from 'auth';
import CartModal from 'components/cart/modal';
import LogoSquare from 'components/logo-square';
import { isUserAuthenticated } from 'helpers/check-cookie-auth';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

export async function Navbar() {
  const cookieStore = await cookies();
  const authenticated = isUserAuthenticated(cookieStore);
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoSquare />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {SITE_NAME}
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>

        <div className="flex items-center justify-end md:w-1/3">
          {authenticated ? (
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button className="mr-2 flex flex-row items-center gap-x-2 text-center text-sm text-black underline-offset-4 hover:text-black hover:underline dark:text-white dark:hover:text-neutral-300">
                <PowerIcon className="w-4" />
                <div className="hidden uppercase md:block">Salir</div>
              </button>
            </form>
          ) : (
            <a
              href="/login"
              className="mr-2 flex flex-row items-center gap-x-2 text-center text-sm text-black underline-offset-4 hover:text-black hover:underline dark:text-white dark:hover:text-neutral-300"
            >
              <ArrowRightIcon className="w-4" />
              <div className="hidden uppercase md:block">Entrar</div>
            </a>
          )}

          <CartModal />
        </div>
      </div>
    </nav>
  );
}
