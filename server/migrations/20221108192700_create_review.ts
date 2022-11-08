import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('reviews', (table) => {
        table.increments('id').primary();

        table
            .integer('user_id')
            .references('id')
            .inTable('users')
            .notNullable()
            .onDelete('CASCADE');

        table
            .integer('game_id')
            .references('id')
            .inTable('games')
            .notNullable()
            .onDelete('CASCADE');

        table.text('body').notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('reviews');
}
