"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.alterTable('games', (table) => {
        table.dropColumn('minAge');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.alterTable('games', (table) => {
        table.integer('min_age').notNullable();
    });
}
exports.down = down;
