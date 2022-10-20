import { z } from 'zod';
import { GenreModelSchema } from './genre-model';
import { MediaModelSchema } from './media-model';
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

export const DetailedGameModelSchema = BaseGameModelSchema.extend({
    creator: UserModelSchema.optional(),
    genres: z.array(GenreModelSchema).optional(),
    media: z.array(MediaModelSchema).optional(),
});

export type BaseGameModel = z.infer<typeof BaseGameModelSchema>;

export type DedailedGameModel = z.infer<typeof DetailedGameModelSchema>;

export type RequestGameModel = Omit<BaseGameModel, 'id' | 'createdAt'>;
