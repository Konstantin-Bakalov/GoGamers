import { z } from 'zod';

export const LikeSchema = z.object({
    id: z.number(),
    reviewId: z.number(),
});

export type LikeRequest = z.infer<typeof LikeSchema>;
