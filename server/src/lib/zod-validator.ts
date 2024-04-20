import { z } from 'zod';

export function zodStringAsNumber(propName?: string) {
  return z.string().transform((value) => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
      throw new z.ZodError([
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
