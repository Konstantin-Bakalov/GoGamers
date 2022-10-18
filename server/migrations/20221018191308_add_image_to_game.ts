import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('media', (table) => {
        table.increments('id').primary();

        table
            .integer('game_id')
            .references('id')
            .inTable('games')
            .notNullable()
            .onDelete('CASCADE');

        table
            .enu('type', ['image', 'video'], {
                useNative: true,
                enumName: 'media_type',
            })
            .alter();

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('media');
}
