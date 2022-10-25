import { z } from 'zod';
import { GenreModelRequestSchema, GenreModelSchema } from './genre-model';
import { MediaModelSchema, MediaRequestModelSchema } from './media-model';
import { UserModelSchema } from './user-model';

export const BaseGameModelSchema = z.object({
    id: z.number(),
    name: z.string(),
    userId: z.number(),
    releaseDate: z.date(),
    developer: z.string(),
    freeToPlay: z.boolean(),
    price: z.number().optional(),
    description: z.string(),
});

export const GameModelRequestSchema = BaseGameModelSchema.omit({
    id: true,
}).extend({
    genres: z.array(GenreModelRequestSchema),
    media: z.array(MediaRequestModelSchema),
});

export const DetailedGameModelSchema = BaseGameModelSchema.extend({
    creator: UserModelSchema.optional(),
    genres: z.array(GenreModelSchema).optional(),
    media: z.array(MediaModelSchema).optional(),
});

export type BaseGameModel = z.infer<typeof BaseGameModelSchema>;

export type GameModelRequest = z.infer<typeof GameModelRequestSchema>;

export type DedailedGameModel = z.infer<typeof DetailedGameModelSchema>;
