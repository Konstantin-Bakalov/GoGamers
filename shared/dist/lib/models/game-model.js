"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGameModelSchema = exports.DetailedGameModelSchema = exports.GameModelRequestSchema = exports.BaseGameModelSchema = exports.maxMediaCount = exports.minMediaCount = void 0;
const zod_1 = require("zod");
const genre_model_1 = require("./genre-model");
const media_model_1 = require("./media-model");
const user_model_1 = require("./user-model");
const minGenreCount = 1;
const maxGenreCount = 7;
const minCharacters = 3;
const maxCharacters = 40;
exports.minMediaCount = 1;
exports.maxMediaCount = 8;
exports.BaseGameModelSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string().min(minCharacters).max(maxCharacters),
    userId: zod_1.z.number(),
    releaseDate: zod_1.z.date(),
    developer: zod_1.z.string().min(5),
    freeToPlay: zod_1.z.boolean(),
    price: zod_1.z.number().positive().optional(),
    description: zod_1.z.string().min(20),
});
exports.GameModelRequestSchema = exports.BaseGameModelSchema.omit({
    id: true,
}).extend({
    genres: zod_1.z
        .array(genre_model_1.GenreModelRequestSchema)
        .min(minGenreCount)
        .max(maxGenreCount),
    media: zod_1.z
        .array(media_model_1.MediaRequestModelSchema)
        .min(exports.minMediaCount)
        .max(exports.maxMediaCount)
        .refine((val) => {
        for (const element of val) {
            if (element.type === 'image') {
                return true;
            }
        }
        return false;
    }, {
        message: 'You must upload at least one image',
    }),
});
exports.DetailedGameModelSchema = exports.BaseGameModelSchema.extend({
    creator: user_model_1.UserModelSchema,
    genres: zod_1.z.array(genre_model_1.GenreModelSchema),
    media: zod_1.z.array(media_model_1.MediaModelSchema),
    createdAt: zod_1.z.date(),
});
exports.UpdateGameModelSchema = exports.BaseGameModelSchema.extend({
    genres: zod_1.z.array(genre_model_1.GenreModelRequestSchema),
    media: zod_1.z.array(media_model_1.MediaModelSchema.or(media_model_1.MediaRequestModelSchema)).refine((val) => {
        for (const element of val) {
            if (element.type === 'image') {
                return true;
            }
        }
        return false;
    }, {
        message: 'You must upload at least one image',
    }),
});
