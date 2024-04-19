"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.alterTable('reviews', (table) => {
        table.dropUnique(['username']);
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.alterTable('reviews', (table) => {
        table.unique(['username']);
    });
}
exports.down = down;
