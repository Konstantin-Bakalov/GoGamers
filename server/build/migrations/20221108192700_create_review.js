"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.createTable('reviews', (table) => {
        table.increments('id').primary();
        table
            .integer('user_id')
            .references('id')
            .inTable('users')
            .notNullable()
            .onDelete('CASCADE');
        table
            .integer('game_id')
            .references('id')
            .inTable('games')
            .notNullable()
            .onDelete('CASCADE');
        table.text('body').notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('reviews');
}
exports.down = down;
