import { z } from 'zod';

export const GenreModelSchema = z.object({
    id: z.number(),
    name: z.string(),
});

export type GenreModel = z.infer<typeof GenreModelSchema>;
