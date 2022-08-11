import express, { json, Router } from 'express';
import Knex from 'knex';
import { Model } from 'objection';
import { config } from '../config';
import knexConfig from '../knexfile';
import userService from './services/user-service';

const knexClient = Knex(knexConfig.development);
Model.knex(knexClient);

const app = express();

app.use(json());

const router = Router();

router.get('/', async (request, response) => {
  const users = await userService.listAll();

  console.log(users);

  response.status(200).json(users);
});

router.post('/', async (request, response) => {
  const { username, password, age } = request.body;

  const user = await userService.register(username, password, age);
  console.log(user);

  response.status(201).json(user);
});

router.get('/:id', async (request, response) => {
  const params = request.params;
  const queries = request.query;

  console.log(queries);

  const user = await userService.getUser(Number(params.id));

  response.status(200).json(user);
});

app.use('/users', router);

const port = config.get('server.port');

app.listen(port, () => console.log(`Listening on ${port}`));
