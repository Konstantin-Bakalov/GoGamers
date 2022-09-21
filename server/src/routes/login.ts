import { Router } from 'express';
import jwt from 'jsonwebtoken';
import userService from '../services/user-service';
import { config } from '../../config';
import { User } from '../middlewares/auth-middleware';
import { requestHandler } from '../lib/request-handler';

const loginRouter = Router();

loginRouter.post(
    '/',
    requestHandler(async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await userService.login(username, password);

            if (!user) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            const jwtKey = config.get('server.jwt_key');
            const userToEncode: User = { username: user.name, userId: user.id };
            const token = jwt.sign(userToEncode, jwtKey, {
                expiresIn: '24h',
            });

            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json(error);
        }
    }),
);

export default loginRouter;
