import express, { json } from 'express';
import Knex from 'knex';
import { Model } from 'objection';
import { config } from '../config';
import knexConfig from '../knexfile';
import loginRouter from './routes/login';
import cors from 'cors';
import gamesRouter from './routes/games';
import { genresRouter } from './routes/genres';
import { errorHandler } from './middlewares/error-handler';
import { mediaRouter } from './routes/media';
import reviewRouter from './routes/reviews';
import likesRouter from './routes/likes';
import dislikesRouter from './routes/dislike';

const knexClient = Knex(knexConfig.development);
Model.knex(knexClient);

const app = express();

app.use(cors());
app.use(json({ limit: '50mb' }));

app.use('/login', loginRouter);
app.use('/games', gamesRouter);
app.use('/genres', genresRouter);
app.use('/media', mediaRouter);
app.use('/reviews', reviewRouter);
app.use('/likes', likesRouter);
app.use('/dislikes', dislikesRouter);

const port = config.get('server.port');

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(errorHandler);
