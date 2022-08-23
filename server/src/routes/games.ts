import { Router } from 'express';
import { z } from 'zod';
import { requestHandler } from '../lib/request-handler';
import auth from '../middlewares/auth-middleware';
import gameService from '../services/game-service';
import gameTransformer from '../transformers/game-transformer';

const gamesRouter = Router();

gamesRouter.get(
    '/:id',
    auth,
    requestHandler(async (req, res) => {
        const { id } = req.params;

        const game = await gameService.findGameById(Number(id));

        if (game) {
            res.status(200).json(gameTransformer.transform(game));
            return;
        }

        res.status(404).json({ message: 'Game not found' });
    })
);

gamesRouter.get(
    '/',
    auth,
    requestHandler(async (req, res) => {
        const { page, searchText } = req.query;
        const pageNumber = Number(page);
        const search = z.string().optional().parse(searchText);

        const { results, total } = await gameService.listGames({
            page: pageNumber,
            pageSize: 5,
            searchText: search,
        });

        res.status(200).json(gameTransformer.transformArray(results));
    })
);

export default gamesRouter;
