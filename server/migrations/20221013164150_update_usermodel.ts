import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', (table) => {
        table.dropColumn('password');
        table.dropUnique(['name']);
        table.text('email').notNullable().unique();
        table.text('profile_picture').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', (table) => {
        table.dropColumn('email');
        table.dropColumn('profile_picture');
        table.text('password').notNullable();
    });
}
