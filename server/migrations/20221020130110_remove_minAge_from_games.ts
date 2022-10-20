import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('games', (table) => {
        table.dropColumn('minAge');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('games', (table) => {
        table.integer('min_age').notNullable();
    });
}
