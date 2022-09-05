import express, { json } from 'express';
import Knex from 'knex';
import { Model } from 'objection';
import { config } from '../config';
import knexConfig from '../knexfile';
import loginRouter from './routes/login';
import usersRouter from './routes/users';
import cors from 'cors';
import gamesRouter from './routes/games';
import { genresRouter } from './routes/genres';
import { errorHandler } from './middlewares/error-handler';

const knexClient = Knex(knexConfig.development);
Model.knex(knexClient);

const app = express();

app.use(cors());
app.use(json());

app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/games', gamesRouter);
app.use('/genres', genresRouter);

const port = config.get('server.port');
app.listen(port, () => console.log(`Listening on ${port}`));

app.use(errorHandler);
