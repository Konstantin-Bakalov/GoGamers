"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DislikeSchema = void 0;
const zod_1 = require("zod");
exports.DislikeSchema = zod_1.z.object({
    id: zod_1.z.number(),
    reviewId: zod_1.z.number(),
});
