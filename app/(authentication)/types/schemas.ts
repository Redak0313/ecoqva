import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z.string().min(1, 'El nombre debe tener al menos 1 caracter.'),
    email: z.string().email('El correo debe ser válido.'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.'),
    confirmPassword: z.string().min(6, 'La confirmación debe tener al menos 6 caracteres.')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword']
  });
