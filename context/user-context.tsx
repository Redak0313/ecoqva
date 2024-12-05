'use client';

import { logOut } from 'components/actions/action';
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

type UserAction = { type: 'SET_USER'; payload: UserContextType } | { type: 'REMOVE_USER' };

interface UserContextType {
  id: string | null;
  name: string | null;
  email: string | null;
}

const initialState = {
  id: null,
  name: null,
  email: null
};

const UserContext = createContext<
  | {
      user: UserContextType;
      setUser: (user: UserContextType) => void;
      removeUser: () => void;
    }
  | undefined
>(undefined);

function userReducer(state: UserContextType, action: UserAction) {
  switch (action.type) {
    case 'SET_USER':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { ...action.payload };
    case 'REMOVE_USER':
      localStorage.removeItem('user');
      return initialState;
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, dispatch] = useReducer(userReducer, initialState);

  const syncUser = async () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(storedUser) });
    } else {
      await logOut();
      dispatch({ type: 'REMOVE_USER' });
    }
  };

  useEffect(() => {
    syncUser();
  }, []);

  const setUser = (user: UserContextType) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const removeUser = () => {
    dispatch({ type: 'REMOVE_USER' });
  };

  const value = useMemo(() => ({ user, setUser, removeUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
