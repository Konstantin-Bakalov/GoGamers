import { Request, RequestHandler, Response } from 'express';
import { ZodError } from 'zod';

export function requestHandler<T>(
    executeHandler: (req: Request<T>, res: Response) => Promise<void>,
): RequestHandler<T> {
    return async (req, res) => {
        try {
            await executeHandler(req, res);
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json(error.flatten());
                return;
            }

            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
}
