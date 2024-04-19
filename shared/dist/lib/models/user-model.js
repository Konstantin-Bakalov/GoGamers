"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModelSchema = void 0;
const zod_1 = require("zod");
exports.UserModelSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    picture: zod_1.z.string().url(),
});
