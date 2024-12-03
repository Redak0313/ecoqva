import { User } from 'app/(main)/lib/definitions';
import bcrypt from 'bcryptjs';
import { createClient } from 'config/supabase/clients';
import { randomUUID } from 'crypto';

export const signUpUser = async (user: User): Promise<{ status: number; message: string }> => {
  try {
    const client = await createClient();
    const hashedPassword = await bcrypt.hash(user.password, 10);

    user.id = randomUUID();

    const existingUser = await client
      .from('users')
      .select('email')
      .eq('email', user.email)
      .single();

    if (existingUser.data) {
      return {
        status: 409,
        message: 'Ya existe un usuario con ese correo.'
      };
    }

    await client.from('users').insert({
      id: user.id,
      name: user.name,
      email: user.email,
      password: hashedPassword
    });

    return {
      status: 201,
      message: 'Usuario registrado correctamente.'
    };
  } catch (error) {
    console.error('Error during user registration:', error);
    return {
      status: 500,
      message: 'Error al registrar el usuario.'
    };
  }
};
