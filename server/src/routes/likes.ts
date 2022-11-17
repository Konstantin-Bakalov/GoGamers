import { Router } from 'express';
import { zodStringAsNumber } from 'shared';
import { z } from 'zod';
import { requestHandler } from '../lib/request-handler';
import auth, { currentUser } from '../middlewares/auth-middleware';
import { likesService } from '../services/likes-service';
import { LikeTransformer } from '../transformers/like-tansformer';

const likesRouter = Router();
const likeTransformer = new LikeTransformer();

likesRouter.post(
    '/',
    auth,
    requestHandler(async (req, res) => {
        const reviewId = z.number().parse(req.body.reviewId);
        const user = currentUser(res);

        const like = await likesService.create(user.id, reviewId);

        res.status(200).json(likeTransformer.transform(like));
    }),
);

likesRouter.delete(
    '/:reviewId',
    auth,
    requestHandler(async (req, res) => {
        const reviewId = zodStringAsNumber().parse(req.params.reviewId);
        const user = currentUser(res);

        await likesService.delete(user.id, reviewId);

        res.status(200).json({});
    }),
);

export default likesRouter;
