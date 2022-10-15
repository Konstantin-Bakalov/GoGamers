import { Request, Response } from 'express';
import { config } from '../../config';
import jwt from 'jsonwebtoken';
import userService from '../services/user-service';
import { UserModel } from '../models/user-model';

interface User {
    email: string;
    userId: number;
}

function verify(token: string, key: string) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (error, decoded) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(decoded);
        });
    });
}

export default async function auth(
    request: Request,
    response: Response,
    next: () => void,
) {
    const token = request.headers.authorization?.split(' ')[1];

    const jwt_key = config.get('server.jwt_key');

    if (token) {
        try {
            const decoded = (await verify(token, jwt_key)) as User;
            const user = await userService.getUserByEmail(decoded.email);

            if (!user) {
                response.status(401).json({ error: 'Unauthorized' });
                return;
            }

            response.locals.user = user;
            next();
        } catch (error) {
            response.status(401).json({ error: 'Invalid token' });
        }
    } else {
        response.status(401).json({ error: 'Something went wrong' });
    }
}

export function currentUser(response: Response): UserModel {
    return response.locals.user;
}
