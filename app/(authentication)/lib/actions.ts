'use server';

import { signIn, signOut } from 'auth';
import { AuthError } from 'next-auth';

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', {
      redirect: false,
      email: formData.get('email'),
      password: formData.get('password')
    });
    return 'Haz iniciado sesión correctamente.';
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Error, credenciales incorrectas.';
        default:
          return 'Error, algo salio mal.';
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
