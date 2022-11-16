import { z } from 'zod';
import { LikeSchema } from './like-model';

export const ReviewModelSchema = z.object({
    userId: z.number(),
    username: z.string(),
    gameId: z.number(),
    body: z.string(),
});

export const ReviewModelRequestSchema = ReviewModelSchema.omit({
    userId: true,
    username: true,
});

export const ReviewModelDetailedSchema = ReviewModelSchema.extend({
    id: z.number(),
    like: LikeSchema.or(z.undefined()),
    createdAt: z.date(),
    profilePicture: z.string().or(z.undefined()),
});

export type ReviewModel = z.infer<typeof ReviewModelSchema>;

export type ReviewModelRequest = z.infer<typeof ReviewModelRequestSchema>;

export type ReviewModelDetailed = z.infer<typeof ReviewModelDetailedSchema>;
