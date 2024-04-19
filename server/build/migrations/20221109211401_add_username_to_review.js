"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.alterTable('reviews', (table) => {
        table.text('username').notNullable().unique();
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.alterTable('reviews', (table) => {
        table.dropColumn('username');
    });
}
exports.down = down;
