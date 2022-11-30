import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('dislikes', (table) => {
        table.increments('id').primary();

        table
            .integer('review_id')
            .references('id')
            .inTable('reviews')
            .onDelete('CASCADE');

        table
            .integer('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('dislikes');
}
