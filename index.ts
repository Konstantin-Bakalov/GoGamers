import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from './knexfile';
import { UserModel } from './models/user-model';
import { GameModel } from './models/game-model';
import { LikeModel } from './models/like-model';
import UserService from './services/user-service';

async function f() {
  const knexClient = Knex(knexConfig.development);
  Model.knex(knexClient);

  try {
    // const result = await GameModel.query().withGraphFetched('likedBy').debug();

    // const result = await GameModel.query()
    //   .modifiers({
    //     usersWithoutPasswords: (query) => query.select('id', 'name', 'age'),
    //   })
    //   .withGraphFetched('[creator(usersWithoutPasswords), likedBy]');

    const result = await GameModel.query()
      .modifiers({
        usersWithoutPasswords: (query) => query.select('id', 'name', 'age'),
        gamesWithCreatorName: (query) => query.where({ name: 'Me' }),
      })
      .withGraphFetched('creator');

    console.log(result);
  } finally {
    await knexClient.destroy();
  }
}

f();
