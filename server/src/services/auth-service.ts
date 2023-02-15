import { config } from '../../config';
import { UserModel } from '../models/user-model';
import jwt from 'jsonwebtoken';
class AuthService {
    generateUserToken(user: UserModel) {
        const jwtKey = config.get('server.jwt_key');

        return jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                profilePicture: user.picture,
            },
            jwtKey,
            {
                expiresIn: '24h',
            },
        );
    }
}

export const authService = new AuthService();
