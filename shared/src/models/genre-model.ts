import { z } from 'zod';

export const GenreModelSchema = z.object({
    id: z.number(),
    name: z.string(),
});

export const GenreModelRequestSchema = GenreModelSchema.omit({
    id: true,
});

export type GenreModel = z.infer<typeof GenreModelSchema>;

export type GenreModelRequest = z.infer<typeof GenreModelRequestSchema>;
