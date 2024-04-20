"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.text('name').notNullable().unique();
        table.text('password').notNullable();
        table.integer('age');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('users');
}
exports.down = down;
