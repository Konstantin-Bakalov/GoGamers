import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('reviews', (table) => {
        table.dropUnique(['username']);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('reviews', (table) => {
        table.unique(['username']);
    });
}
