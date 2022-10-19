import { z } from 'zod';

export const CreateGameInputSchema = z.object({
    name: z.string().min(3),
    minAge: z.number().positive(),
    genres: z.array(z.string()).min(1),
    url: z.string(),
    type: z.literal('image').or(z.literal('video')),
});

export type CreateGameInput = z.infer<typeof CreateGameInputSchema>;
