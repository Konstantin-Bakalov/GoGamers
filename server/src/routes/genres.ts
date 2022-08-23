import { Router } from 'express';
import { requestHandler } from '../lib/request-handler';
import auth from '../middlewares/auth-middleware';
import genreService from '../services/genre-service';
import { GenreTransformer } from '../transformers/gerne-transformer';

const genresRouter = Router();

const transformer = new GenreTransformer();

genresRouter.get(
    '/',
    auth,
    requestHandler(async (request, response) => {
        const genres = await genreService.all();

        response.status(200).json(transformer.transformArray(genres));
    })
);

export { genresRouter };
