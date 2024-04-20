"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.alterTable('media', (table) => {
        table.text('url').notNullable().unique();
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.alterTable('media', (table) => {
        table.dropColumn('url');
    });
}
exports.down = down;
