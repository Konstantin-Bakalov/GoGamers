import { z } from 'zod';

export const UserModelSchema = z.object({
    id: z.number().nonnegative(),
    createdAt: z.date(),
    name: z.string(),
    email: z.string().email(),
    profilePicture: z.string().url(),
});

export type UserModel = z.infer<typeof UserModelSchema>;

export type User = Pick<UserModel, 'name' | 'email' | 'profilePicture'>;
