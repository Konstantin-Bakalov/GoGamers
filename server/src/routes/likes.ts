import { Router } from 'express';
import { LikeRequestSchema } from 'shared';
import { requestHandler } from '../lib/request-handler';
import auth, { currentUser } from '../middlewares/auth-middleware';
import { likesService } from '../services/likes-service';

const likesRouter = Router();

likesRouter.post(
    '/',
    auth,
    requestHandler(async (req, res) => {
        const { reviewId } = LikeRequestSchema.parse(req.body);
        const user = currentUser(res);

        const like = await likesService.create(user.id, reviewId);

        res.status(200).json(like);
    }),
);

export default likesRouter;
