import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('games', (table) => {
        table.timestamp('release_date').notNullable();
        table.text('developer').notNullable();
        table.boolean('free_to_play').notNullable();
        table.decimal('price');
        table.text('description').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('games', (table) => {
        table.dropColumns(
            'release_date',
            'developer',
            'free_to_play',
            'price',
            'description',
        );
    });
}
