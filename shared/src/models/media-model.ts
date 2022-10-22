import { z } from 'zod';

export type MediaType = 'image' | 'video';

export const MediaModelSchema = z.object({
    id: z.number(),
    gameId: z.number().nonnegative(),
    type: z.enum(['image', 'video']),
    url: z.string().url(),
});

export type MediaModel = z.infer<typeof MediaModelSchema>;

export const MediaRequestModelSchema = z.object({
    type: z.enum(['image', 'video']),
    media: z.string().url(),
});

export type MediaRequestModel = z.infer<typeof MediaRequestModelSchema>;
