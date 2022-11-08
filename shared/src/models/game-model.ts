import { string, z } from 'zod';
import { zodStringAsNumber } from '../lib/zod-validator';
import { GenreModelRequestSchema, GenreModelSchema } from './genre-model';
import { MediaModelSchema, MediaRequestModelSchema } from './media-model';
import { UserModelSchema } from './user-model';

const minGenreCount = 1;
const maxGenrecount = 5;
export const minMediaCount = 1;
export const maxMediaCount = 7;

export const BaseGameModelSchema = z.object({
    id: z.number(),
    name: z.string().min(2),
    userId: z.number(),
    releaseDate: z.date(),
    developer: z.string().min(5),
    freeToPlay: z.boolean(),
    price: z.number().positive().optional(),
    description: z.string().min(20).max(150),
});

export const GameModelRequestSchema = BaseGameModelSchema.omit({
    id: true,
}).extend({
    genres: z
        .array(GenreModelRequestSchema)
        .min(minGenreCount)
        .max(maxGenrecount),
    media: z
        .array(MediaRequestModelSchema)
        .min(minMediaCount)
        .max(maxMediaCount),
});

export const DetailedGameModelSchema = BaseGameModelSchema.extend({
    creator: UserModelSchema,
    genres: z.array(GenreModelSchema),
    media: z.array(MediaModelSchema),
});

export type BaseGameModel = z.infer<typeof BaseGameModelSchema>;

export type GameModelRequest = z.infer<typeof GameModelRequestSchema>;

export type DetailedGameModel = z.infer<typeof DetailedGameModelSchema>;
