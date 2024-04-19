"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModelDetailedSchema = exports.ReviewModelRequestSchema = exports.ReviewModelSchema = void 0;
const zod_1 = require("zod");
exports.ReviewModelSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string(),
    gameId: zod_1.z.number(),
    body: zod_1.z.string(),
});
exports.ReviewModelRequestSchema = exports.ReviewModelSchema.omit({
    userId: true,
    username: true,
});
exports.ReviewModelDetailedSchema = exports.ReviewModelSchema.extend({
    id: zod_1.z.number(),
    liked: zod_1.z.boolean(),
    disliked: zod_1.z.boolean(),
    likes: zod_1.z.number().nonnegative(),
    dislikes: zod_1.z.number().nonnegative(),
    createdAt: zod_1.z.date(),
    profilePicture: zod_1.z.string().or(zod_1.z.undefined()),
});
