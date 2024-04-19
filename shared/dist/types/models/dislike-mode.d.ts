import { z } from 'zod';
export declare const DislikeSchema: z.ZodObject<{
    id: z.ZodNumber;
    reviewId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
    reviewId: number;
}, {
    id: number;
    reviewId: number;
}>;
export declare type DislikeRequest = z.infer<typeof DislikeSchema>;
