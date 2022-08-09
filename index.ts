import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from './knexfile';
import { UserModel } from './models/user-model';
import { GameModel } from './models/game-model';

async function f() {
  const knexClient = Knex(knexConfig.development);
  Model.knex(knexClient);

  try {
    const result = await GameModel.query().findById(1);

    console.log(result);
  } finally {
    await knexClient.destroy();
  }
}

f();
