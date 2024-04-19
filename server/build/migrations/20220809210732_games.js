"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.createTable('games', (table) => {
        table.increments('id').primary();
        table.text('name').notNullable();
        table.integer('min_age').notNullable();
        table
            .integer('user_id')
            .references('id')
            .inTable('users')
            .notNullable()
            .onDelete('CASCADE');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('games');
}
exports.down = down;
