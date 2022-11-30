import { z } from 'zod';

export const DislikeSchema = z.object({
    id: z.number(),
    reviewId: z.number(),
});

export type DislikeRequest = z.infer<typeof DislikeSchema>;
