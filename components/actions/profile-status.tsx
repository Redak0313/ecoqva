'use client';

import { useUser } from 'context/user-context';
import { ProfileIcon } from './profile-icon';

interface ProfileStatusProps {
  className?: string;
}
export const ProfileStatus = ({ className }: ProfileStatusProps) => {
  const { user } = useUser();
  return <div className={className}> {user.email ? <ProfileIcon /> : null}</div>;
};
