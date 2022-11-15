import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('likes', (table) => {
        table.dropColumn('game_id');

        table
            .integer('review_id')
            .references('id')
            .inTable('reviews')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('likes', (table) => {
        table.dropColumn('review_id');
    });
}
