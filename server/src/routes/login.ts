import { Router } from 'express';
import userService from '../services/user-service';
import { requestHandler } from '../lib/request-handler';
import { z } from 'zod';
import jwtDecode from 'jwt-decode';
import { User } from 'shared';
import { authService } from '../services/auth-service';

const loginRouter = Router();

loginRouter.post(
    '/',
    requestHandler(async (req, res) => {
        try {
            const credential = z.string().parse(req.body.credential);
            const userDecoded = jwtDecode<User>(credential);

            let user = await userService.getUserByEmail(userDecoded.email);

            if (!user) {
                user = await userService.create(userDecoded);
            }

            const token = authService.generateUserToken(user);

            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json(error);
        }
    }),
);

export default loginRouter;
