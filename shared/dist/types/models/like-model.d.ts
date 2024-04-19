import { z } from 'zod';
export declare const LikeSchema: z.ZodObject<{
    id: z.ZodNumber;
    reviewId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
    reviewId: number;
}, {
    id: number;
    reviewId: number;
}>;
export declare type LikeRequest = z.infer<typeof LikeSchema>;
