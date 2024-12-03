import { ArrowRightIcon } from '@heroicons/react/20/solid';

export function Login() {
  return (
    <a
      href="/login"
      className="mr-2 flex flex-row items-center gap-x-2 text-center text-sm text-black underline-offset-4 hover:text-black hover:underline dark:text-white dark:hover:text-neutral-300"
    >
      <ArrowRightIcon className="w-4" />
      <div className="hidden uppercase md:block">Entrar</div>
    </a>
  );
}
