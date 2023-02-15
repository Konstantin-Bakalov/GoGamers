import { z } from 'zod';

export const UserModelSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    picture: z.string().url(),
});

export type User = z.infer<typeof UserModelSchema>;
