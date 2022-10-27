import { Router } from 'express';
import { z } from 'zod';
import { requestHandler } from '../lib/request-handler';
import auth, { currentUser } from '../middlewares/auth-middleware';
import gameService from '../services/game-service';
import { GameTransformer } from '../transformers/game-transformer';
import { GameModelRequestSchema } from 'shared';

const gamesRouter = Router();

const transformer = new GameTransformer();

gamesRouter.get(
    '/:id',
    auth,
    requestHandler(async (req, res) => {
        const { id } = req.params;

        const game = await gameService.findGameById(Number(id));

        res.status(200).json(transformer.transform(game));
    }),
);

gamesRouter.get(
    '/',
    auth,
    requestHandler(async (req, res) => {
        const { searchText, page } = req.query;
        console.log(page, searchText);
        const pageNumber = Number(page);
        const search = z.string().optional().parse(searchText);

        const { results, total } = await gameService.listGames({
            page: pageNumber,
            pageSize: 3,
            searchText: search,
        });

        console.log(results.length, total);

        res.status(200).json(transformer.transformArray(results));
    }),
);

gamesRouter.post(
    '/',
    auth,
    requestHandler(async (req, res) => {
        const user = currentUser(res);
        const parsedGame = GameModelRequestSchema.parse({
            ...req.body,
            userId: user.id,
            releaseDate: new Date(req.body.releaseDate),
        });

        const game = await gameService.create(parsedGame);

        res.status(200).json(transformer.transform(game));
    }),
);

export default gamesRouter;
