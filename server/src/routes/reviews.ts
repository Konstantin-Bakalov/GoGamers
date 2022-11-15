import { Router } from 'express';
import { requestHandler } from '../lib/request-handler';
import auth, { currentUser } from '../middlewares/auth-middleware';
import { ReviewModelRequestSchema, zodStringAsNumber } from 'shared';
import { reviewService } from '../services/review-service';
import { ReviewTransformer } from '../transformers/review-transformer';

const reviewRouter = Router();
const reviewTransformer = new ReviewTransformer();

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
    }),
);

reviewRouter.get(
    '/:gameId',
    auth,
    requestHandler(async (req, res) => {
        const gameId = zodStringAsNumber().parse(req.params.gameId);

        const reviews = await reviewService.list(gameId);
        console.log(reviews);

        res.status(200).json(reviewTransformer.transformArray(reviews));
    }),
);

export default reviewRouter;
