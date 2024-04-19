"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaRequestModelSchema = exports.MediaModelSchema = void 0;
const zod_1 = require("zod");
exports.MediaModelSchema = zod_1.z.object({
    id: zod_1.z.number(),
    gameId: zod_1.z.number().nonnegative(),
    type: zod_1.z.enum(['image', 'video']),
    url: zod_1.z.string().url(),
});
exports.MediaRequestModelSchema = zod_1.z.object({
    type: zod_1.z.enum(['image', 'video']),
    url: zod_1.z.string().url(),
});
