import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../knexfile';
import gameService from './services/game-service';

async function f() {
  const knexClient = Knex(knexConfig.development);
  Model.knex(knexClient);

  try {
    const result = await gameService.getGamesWithLikes();

    console.log(result);
  } finally {
    await knexClient.destroy();
  }
}
