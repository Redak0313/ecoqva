import { PencilIcon, UserIcon } from '@heroicons/react/20/solid';
import { UserContextType } from 'context/user-context';

interface ProfileStatusProps {
  user?: UserContextType;
}

const ProfilePage = ({ user }: ProfileStatusProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4 p-4">
      <div className="g flex w-full flex-row items-center justify-between rounded-lg border border-neutral-200 bg-gray-900 p-4 md:w-1/3 dark:border-neutral-700">
        <div className="flex flex-row items-center gap-2">
          <UserIcon className="w-12 rounded-full border border-neutral-200 md:w-8" />
          <h1>{user?.name ?? 'John Doe'} </h1>
        </div>
        <div>
          <PencilIcon className="w-6 hover:text-slate-400" />
        </div>
      </div>
      <div className="g flex w-full flex-col items-start justify-between rounded-lg border border-neutral-200 bg-gray-900 p-4 md:w-1/3 dark:border-neutral-700">
        <div className="mb-2 flex w-full flex-row items-center gap-2 border-b border-neutral-200">
          <h2>Direcciones:</h2>
        </div>
        <div className="flex w-full flex-row items-center justify-between">
          <div>
            <p>Calle</p>
            <p>Número</p>
            <p>Municipio, Provincia</p>
            <p>CP</p>
          </div>
          <div>
            <PencilIcon className="w-6 hover:text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
