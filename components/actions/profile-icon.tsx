import { UserIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export function ProfileIcon() {
  return (
    <Link
      href="/profile"
      className="mr-2 flex flex-row items-center gap-x-2 rounded-full border border-neutral-200 text-center text-sm text-black underline-offset-4 hover:text-black hover:underline dark:text-white dark:hover:text-neutral-300"
    >
      <UserIcon className="w-12 md:w-8" />
    </Link>
  );
}
