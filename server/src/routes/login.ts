import { Router } from 'express';
import jwt from 'jsonwebtoken';
import userService from '../services/user-service';
import { config } from '../../config';
import { User } from '../middlewares/auth-middleware';

const loginRouter = Router();

loginRouter.post('/', async (request, response) => {
    try {
        const { username, password } = request.body;

        const user = await userService.login(username, password);

        if (!user) {
            response.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const jwtKey = config.get('server.jwt_key');
        const userToEncode: User = { username: user.name, userId: user.id };
        const token = jwt.sign(userToEncode, jwtKey, {
            expiresIn: '24h',
        });

        response.status(200).json({ token });
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
});

export default loginRouter;
