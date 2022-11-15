import { z } from 'zod';

export const LikeRequestSchema = z.object({
    reviewId: z.number(),
});

export type LikeRequest = z.infer<typeof LikeRequestSchema>;
