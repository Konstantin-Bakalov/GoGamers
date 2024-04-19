import { z } from 'zod';
export declare const GenreModelSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: number;
}, {
    name: string;
    id: number;
}>;
export declare const GenreModelRequestSchema: z.ZodObject<Omit<{
    id: z.ZodNumber;
    name: z.ZodString;
}, "id">, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
export declare type GenreModel = z.infer<typeof GenreModelSchema>;
export declare type GenreModelRequest = z.infer<typeof GenreModelRequestSchema>;
