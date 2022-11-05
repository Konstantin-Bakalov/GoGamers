import { Router } from 'express';
import { z } from 'zod';
import { requestHandler } from '../lib/request-handler';
import auth, { currentUser } from '../middlewares/auth-middleware';
import gameService from '../services/game-service';
import { GameTransformer } from '../transformers/game-transformer';
import { GameModelRequestSchema, zodStringAsNumber } from 'shared';

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
        const page = zodStringAsNumber().parse(req.query.page);
        const maxItems = zodStringAsNumber().parse(req.query.maxItems);
        const searchText = z.string().optional().parse(req.query.searchText);
        const orderBy = z.string().parse(req.query.orderBy);

        const { results, total } = await gameService.listGames({
            page: page - 1,
            pageSize: maxItems,
            searchText,
            orderBy,
        });

        res.status(200).json({
            results: transformer.transformArray(results),
            total,
        });
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

gamesRouter.delete(
    '/:id',
    auth,
    requestHandler(async (req, res) => {
        const id = zodStringAsNumber().parse(req.params.id);
        const user = currentUser(res);

        await gameService.deleteById(id, user.id);

        res.status(200).json({ message: 'Game deleted' });
    }),
);

export default gamesRouter;
