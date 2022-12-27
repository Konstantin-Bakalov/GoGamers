import { z } from 'zod';

export const GenreModelSchema = z.object({
    id: z.number(),
    name: z.string(),
});

export const GenreModelRequestSchema = GenreModelSchema.omit({
    id: true,
});

export const GenreDetailedModel = GenreModelSchema.extend({
    createdAt: z.date(),
});

export type GenreModel = z.infer<typeof GenreModelSchema>;

export type GenreModelRequest = z.infer<typeof GenreModelRequestSchema>;

export type GenreDetailed = z.infer<typeof GenreDetailedModel>;
