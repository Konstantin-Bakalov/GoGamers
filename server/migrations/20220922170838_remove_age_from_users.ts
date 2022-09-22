import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', (table) => {
        table.dropColumn('age');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', (table) => {
        table.integer('age');
    });
}
