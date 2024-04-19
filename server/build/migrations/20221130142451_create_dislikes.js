"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.createTable('dislikes', (table) => {
        table.increments('id').primary();
        table
            .integer('review_id')
            .references('id')
            .inTable('reviews')
            .onDelete('CASCADE');
        table
            .integer('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('dislikes');
}
exports.down = down;
