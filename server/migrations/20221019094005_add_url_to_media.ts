import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('media', (table) => {
        table.text('url').notNullable().unique();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('media', (table) => {
        table.dropColumn('url');
    });
}
