"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.alterTable('games', (table) => {
        table.timestamp('release_date').notNullable();
        table.text('developer').notNullable();
        table.boolean('free_to_play').notNullable();
        table.decimal('price');
        table.text('description').notNullable();
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.alterTable('games', (table) => {
        table.dropColumns('release_date', 'developer', 'free_to_play', 'price', 'description');
    });
}
exports.down = down;
