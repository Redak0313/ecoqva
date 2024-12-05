'use client';

import { useUser } from 'context/user-context';
import { Login } from './login';
import { Logout } from './logout';

export const Status = () => {
  const { user } = useUser();
  return <div> {user.email ? <Logout /> : <Login />}</div>;
};
