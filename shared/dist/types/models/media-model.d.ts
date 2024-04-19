import { z } from 'zod';
export declare type MediaType = 'image' | 'video';
export declare const MediaModelSchema: z.ZodObject<{
    id: z.ZodNumber;
    gameId: z.ZodNumber;
    type: z.ZodEnum<["image", "video"]>;
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    type: "image" | "video";
    gameId: number;
    url: string;
}, {
    id: number;
    type: "image" | "video";
    gameId: number;
    url: string;
}>;
export declare type MediaModel = z.infer<typeof MediaModelSchema>;
export declare const MediaRequestModelSchema: z.ZodObject<{
    type: z.ZodEnum<["image", "video"]>;
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "image" | "video";
    url: string;
}, {
    type: "image" | "video";
    url: string;
}>;
export declare type MediaRequestModel = z.infer<typeof MediaRequestModelSchema>;
