"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreModelRequestSchema = exports.GenreModelSchema = void 0;
const zod_1 = require("zod");
const minCharacters = 3;
const maxCharacters = 20;
exports.GenreModelSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string().min(minCharacters).max(maxCharacters),
});
exports.GenreModelRequestSchema = exports.GenreModelSchema.omit({
    id: true,
});
