import { z } from 'zod';

export const GameModelSchema = z.object({
    id: z.number().nonnegative(),
    createdAt: z.date(),
    name: z.string(),
    minAge: z.string(),
    userId: z.number(),
});

export type GameModel = z.infer<typeof GameModelSchema>;
