import { z } from 'zod';

const minCharacters = 3;
const maxCharacters = 20;

export const GenreModelSchema = z.object({
    id: z.number(),
    name: z.string().min(minCharacters).max(maxCharacters),
});

export const GenreModelRequestSchema = GenreModelSchema.omit({
    id: true,
});

export type GenreModel = z.infer<typeof GenreModelSchema>;

export type GenreModelRequest = z.infer<typeof GenreModelRequestSchema>;
