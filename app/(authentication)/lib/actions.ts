'use server';

import { signIn, signOut } from 'auth';
import { AuthError } from 'next-auth';
import { signUpUser } from 'sql/users';
import { signUpSchema } from '../types/schemas';

export async function authenticate(prevState: any, formData: FormData) {
  try {
    const email = formData.get('email') as string;
    await signIn('credentials', {
      redirect: false,
      email: email,
      password: formData.get('password')
    });

    return {
      email,
      message: 'Haz iniciado sesión correctamente.'
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            email: null,
            message: 'Error, correo o contraseña incorrectos.'
          };
        default:
          return {
            email: null,
            message: 'Error, algo salió mal.'
          };
      }
    }
    throw error;
  }
}

export async function logOut() {
  try {
    await signOut({ redirect: false });

    return {
      message: 'Haz cerrado sesión correctamente.'
    };
  } catch (error) {
    throw error;
  }
}

export async function register(
  prevState: { status: number; message: string } | undefined,
  formData: FormData
) {
  try {
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('password-confirm') as string
    };

    // Validación del esquema con zod
    const parsed = signUpSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;

      if (data.password !== data.confirmPassword) {
        return {
          status: 400,
          message: 'Error, las contraseñas no coinciden.'
        };
      }

      if (fieldErrors.email) {
        return {
          status: 400,
          message: 'Error, el correo debe ser válido.'
        };
      }

      if (fieldErrors.password) {
        return {
          status: 400,
          message: 'Error, la contraseña debe tener al menos 6 caracteres.'
        };
      }

      return {
        status: 400,
        message: 'Error, algo salió mal en la validación.'
      };
    }

    // Registro del usuario en la base de datos
    const response = await signUpUser({
      name: data.name,
      email: data.email,
      password: data.password
    });

    // Respuesta basada en el resultado de signUpUser
    return {
      status: response.status,
      message: response.message
    };
  } catch (error) {
    console.error('Error en register:', error);
    return {
      status: 500,
      message: 'Error interno del servidor.'
    };
  }
}
