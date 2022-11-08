import { z } from 'zod';

export const ReviewModelSchema = z.object({
    userId: z.number(),
    gameId: z.number(),
    body: z.string(),
});

export const ReviewModelRequestSchema = ReviewModelSchema.omit({
    userId: true,
});

export type ReviewModel = z.infer<typeof ReviewModelSchema>;

export type ReviewModelRequest = z.infer<typeof ReviewModelRequestSchema>;
