import { PowerIcon } from '@heroicons/react/20/solid';
import { logOut } from 'app/(authentication)/lib/actions';
import { useUser } from 'context/user-context';

export function Logout() {
  const { removeUser } = useUser();
  return (
    <form
      action={() => {
        removeUser();
        logOut();
      }}
    >
      <button className="mr-2 flex flex-row items-center gap-x-2 text-center text-sm text-black underline-offset-4 hover:text-black hover:underline dark:text-white dark:hover:text-neutral-300">
        <PowerIcon className="w-4" />
        <div className="hidden uppercase md:block">Salir</div>
      </button>
    </form>
  );
}
