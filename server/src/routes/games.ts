import { Router } from 'express';
import { requestHandler } from '../lib/request-handler';
import auth from '../middlewares/auth-middleware';
import gameService from '../services/game-service';
import gameTransformer from '../transformers/game-transformer';

const gamesRouter = Router();

gamesRouter.get(
    '/',
    auth,
    requestHandler(async (req, res) => {
        const { results, total } = await gameService.listGames(1, 5);

        res.status(200).json(gameTransformer.transformArray(results));
    })
);

export default gamesRouter;
