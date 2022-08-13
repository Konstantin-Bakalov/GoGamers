import express, { json, Router } from 'express';
import Knex from 'knex';
import { Model } from 'objection';
import { config } from '../config';
import knexConfig from '../knexfile';
import loginRouter from './routes/login';
import usersRouter from './routes/users';

const knexClient = Knex(knexConfig.development);
Model.knex(knexClient);

const app = express();

app.use(json());

app.use('/login', loginRouter);
app.use('/users', usersRouter);

const port = config.get('server.port');

app.listen(port, () => console.log(`Listening on ${port}`));
