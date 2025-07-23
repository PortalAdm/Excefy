import { z } from 'zod';

const defaultMessage = 'Por favor, confira';
const minLengthPassword = 6;

export const recoverySchema = z.object({
  email: z.string().nonempty(`${defaultMessage} seu email`).toLowerCase()
});

export const authSubmitSchema = z.object({
  userName: z.string().nonempty(`${defaultMessage} seu usuário`).toLowerCase(),
  password: z
    .string()
    .nonempty(`${defaultMessage} sua senha`)
    .min(minLengthPassword, `Nome deve ter pelomenos ${minLengthPassword} caracteres`)
});

export type TAuthSubmitSchema = z.infer<typeof authSubmitSchema>;
export type TRecoverySchema = z.infer<typeof recoverySchema>;
