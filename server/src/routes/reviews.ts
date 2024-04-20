import { Router } from 'express';
import { requestHandler } from '../lib/request-handler';
import auth, { currentUser } from '../middlewares/auth-middleware';
import { ReviewModelRequestSchema } from 'shared';
import { reviewService } from '../services/review-service';
import { ReviewTransformer } from '../transformers/review-transformer';
import { zodStringAsNumber } from '../lib/zod-validator';

const reviewRouter = Router();
const reviewTransformer = new ReviewTransformer();

const pageSize = 3;

reviewRouter.post(
  '/',
  auth,
  requestHandler(async (req, res) => {
    const review = ReviewModelRequestSchema.parse(req.body);
    const user = currentUser(res);

    const createdReview = await reviewService.create({
      userId: user.id,
      username: user.name,
      gameId: review.gameId,
      body: review.body,
    });

    res.status(200).json(reviewTransformer.transform(createdReview));
  })
);

reviewRouter.get(
  '/:gameId',
  auth,
  requestHandler(async (req, res) => {
    const page = zodStringAsNumber().parse(req.query.page);

    const gameId = zodStringAsNumber().parse(req.params.gameId);
    const user = currentUser(res);

    const { results, total } = await reviewService.list(user.id, gameId, page - 1, pageSize);

    res.status(200).json({
      results: reviewTransformer.transformArray(results),
      total,
    });
  })
);

export default reviewRouter;
