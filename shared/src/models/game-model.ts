import { z } from 'zod';
import { GenreModelRequestSchema, GenreModelSchema } from './genre-model';
import { MediaModelSchema, MediaRequestModelSchema } from './media-model';
import { UserModelSchema } from './user-model';

const minGenreCount = 1;
const maxGenreCount = 5;
const minCharacters = 3;
const maxCharacters = 30;
export const minMediaCount = 1;
export const maxMediaCount = 7;

export const BaseGameModelSchema = z.object({
    id: z.number(),
    name: z.string().min(minCharacters).max(maxCharacters),
    userId: z.number(),
    releaseDate: z.date(),
    developer: z.string().min(5),
    freeToPlay: z.boolean(),
    price: z.number().positive().optional(),
    description: z.string().min(20).max(1000),
});

export const GameModelRequestSchema = BaseGameModelSchema.omit({
    id: true,
}).extend({
    genres: z
        .array(GenreModelRequestSchema)
        .min(minGenreCount)
        .max(maxGenreCount),
    media: z
        .array(MediaRequestModelSchema)
        .min(minMediaCount)
        .max(maxMediaCount)
        .refine(
            (val) => {
                for (const element of val) {
                    if (element.type === 'image') {
                        return true;
                    }
                }

                return false;
            },
            {
                message: 'You must upload at least one image',
            },
        ),
});

export const DetailedGameModelSchema = BaseGameModelSchema.extend({
    creator: UserModelSchema,
    genres: z.array(GenreModelSchema),
    media: z.array(MediaModelSchema),
});

export const UpdateGameModelSchema = BaseGameModelSchema.extend({
    genres: z.array(GenreModelRequestSchema),
    media: z.array(MediaModelSchema.or(MediaRequestModelSchema)).refine(
        (val) => {
            for (const element of val) {
                if (element.type === 'image') {
                    return true;
                }
            }

            return false;
        },
        {
            message: 'You must upload at least one image',
        },
    ),
});

export type BaseGameModel = z.infer<typeof BaseGameModelSchema>;

export type GameModelRequest = z.infer<typeof GameModelRequestSchema>;

export type DetailedGameModel = z.infer<typeof DetailedGameModelSchema>;

export type UpdateGameModel = z.infer<typeof UpdateGameModelSchema>;
