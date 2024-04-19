import { z } from 'zod';
export declare const UserModelSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    email: z.ZodString;
    picture: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: number;
    email: string;
    picture: string;
}, {
    name: string;
    id: number;
    email: string;
    picture: string;
}>;
export declare type User = z.infer<typeof UserModelSchema>;
