import { z } from 'zod';

export const User = z.object({
    name: z.string(),
    email: z.string(),
    profilePicture: z.string(),
});

export type User = z.infer<typeof User>;
