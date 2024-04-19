import { z } from 'zod';
export declare const ReviewModelSchema: z.ZodObject<{
    userId: z.ZodNumber;
    username: z.ZodString;
    gameId: z.ZodNumber;
    body: z.ZodString;
}, "strip", z.ZodTypeAny, {
    gameId: number;
    userId: number;
    username: string;
    body: string;
}, {
    gameId: number;
    userId: number;
    username: string;
    body: string;
}>;
export declare const ReviewModelRequestSchema: z.ZodObject<Omit<{
    userId: z.ZodNumber;
    username: z.ZodString;
    gameId: z.ZodNumber;
    body: z.ZodString;
}, "userId" | "username">, "strip", z.ZodTypeAny, {
    gameId: number;
    body: string;
}, {
    gameId: number;
    body: string;
}>;
export declare const ReviewModelDetailedSchema: z.ZodObject<z.extendShape<{
    userId: z.ZodNumber;
    username: z.ZodString;
    gameId: z.ZodNumber;
    body: z.ZodString;
}, {
    id: z.ZodNumber;
    liked: z.ZodBoolean;
    disliked: z.ZodBoolean;
    likes: z.ZodNumber;
    dislikes: z.ZodNumber;
    createdAt: z.ZodDate;
    profilePicture: z.ZodUnion<[z.ZodString, z.ZodUndefined]>;
}>, "strip", z.ZodTypeAny, {
    profilePicture?: string | undefined;
    id: number;
    gameId: number;
    userId: number;
    createdAt: Date;
    username: string;
    body: string;
    liked: boolean;
    disliked: boolean;
    likes: number;
    dislikes: number;
}, {
    profilePicture?: string | undefined;
    id: number;
    gameId: number;
    userId: number;
    createdAt: Date;
    username: string;
    body: string;
    liked: boolean;
    disliked: boolean;
    likes: number;
    dislikes: number;
}>;
export declare type ReviewModel = z.infer<typeof ReviewModelSchema>;
export declare type ReviewModelRequest = z.infer<typeof ReviewModelRequestSchema>;
export declare type ReviewModelDetailed = z.infer<typeof ReviewModelDetailedSchema>;
