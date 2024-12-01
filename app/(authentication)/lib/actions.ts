'use server';

import { signIn, signOut } from 'auth';
import { AuthError } from 'next-auth';

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciales incorrectas.';
        default:
          return 'Algo salio mal.';
      }
    }
    throw error;
  }
}

export async function logOut() {
  try {
    await signOut();
  } catch (error) {
    throw error;
  }
}
