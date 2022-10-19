import { z } from 'zod';

export const GenreModelSchema = z.object({
    id: z.number().nonnegative(),
    createdAt: z.date(),
    name: z.string(),
});

export type GenreModel = z.infer<typeof GenreModelSchema>;
