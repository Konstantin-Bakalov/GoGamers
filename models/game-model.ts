import { Model, QueryContext } from 'objection';
import { UserModel } from './user-model';

export class GameModel extends Model {
  id!: number;
  name!: string;
  minAge!: number;
  userId!: number;
  createdAt!: Date;
  creator?: UserModel;

  static get tableName() {
    return 'games';
  }

  static get relationMappings() {
    return {
      creator: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: 'games.user_id',
          to: 'users.id',
        },
      },
    };
  }

  async $beforInsert(queryContext: QueryContext) {
    await super.$beforeInsert(queryContext);
    this.createdAt = new Date();
  }
}
