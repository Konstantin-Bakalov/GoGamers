"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodStringAsNumber = void 0;
const zod_1 = require("zod");
function zodStringAsNumber(propName) {
    return zod_1.z.string().transform((value) => {
        const parsed = Number(value);
        if (Number.isNaN(parsed)) {
            throw new zod_1.z.ZodError([
                {
                    code: 'invalid_type',
                    expected: 'number',
                    received: 'unknown',
                    message: 'expected a numeric string',
                    path: [propName || ''],
                },
            ]);
        }
        return parsed;
    });
}
exports.zodStringAsNumber = zodStringAsNumber;
