import { Router } from 'express';
import { z } from 'zod';
import { requestHandler } from '../lib/request-handler';
import auth, { currentUser } from '../middlewares/auth-middleware';
import { dislikesService } from '../services/dislike-service';
import { DislikeTransformer } from '../transformers/dislike-transformer';
import { zodStringAsNumber } from '../lib/zod-validator';

const dislikesRouter = Router();
const dislikeTransformer = new DislikeTransformer();

dislikesRouter.post(
  '/',
  auth,
  requestHandler(async (req, res) => {
    const reviewId = z.number().parse(req.body.reviewId);
    const user = currentUser(res);

    const dislike = await dislikesService.create(user.id, reviewId);

    res.status(200).json(dislikeTransformer.transform(dislike));
  })
);

dislikesRouter.delete(
  '/:reviewId',
  auth,
  requestHandler(async (req, res) => {
    const reviewId = zodStringAsNumber().parse(req.params.reviewId);
    const user = currentUser(res);

    await dislikesService.delete(user.id, reviewId);

    res.status(200).json({});
  })
);

export default dislikesRouter;
