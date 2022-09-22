import { z } from 'zod';

const usernameMinLength = 5;
const passwordMinLength = 8;
const usernameMaxLength = 15;
const passwordMaxLength = 15;

export const RegisterInputSchema = z.object({
    username: z.string().min(usernameMinLength).max(usernameMaxLength),
    password: z.string().min(passwordMinLength).max(passwordMaxLength),
});

export type RegisterInput = z.infer<typeof RegisterInputSchema>;
