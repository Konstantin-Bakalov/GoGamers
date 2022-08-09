import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from './knexfile';
import { UserModel } from './models/user-model';

async function f() {
  const knexClient = Knex(knexConfig.development);
  Model.knex(knexClient);

  const result = await UserModel.query().insert({
    name: 'Me',
    age: 23,
    password: 'gligan',
  });

  console.log(result);

  await knexClient.destroy();
}

f();
