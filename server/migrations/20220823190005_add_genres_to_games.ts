import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('genres', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable().unique();

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('game_genres', (table) => {
        table.increments('id').primary();

        table
            .integer('game_id')
            .notNullable()
            .references('id')
            .inTable('games')
            .onDelete('CASCADE');

        table
            .integer('genre_id')
            .notNullable()
            .references('id')
            .inTable('genres')
            .onDelete('CASCADE');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('game_genres');
    await knex.schema.dropTable('genres');
}
