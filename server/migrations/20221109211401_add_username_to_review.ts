import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('reviews', (table) => {
        table.text('username').notNullable().unique();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('reviews', (table) => {
        table.dropColumn('username');
    });
}
