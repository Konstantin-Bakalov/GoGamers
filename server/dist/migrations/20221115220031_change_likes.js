"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.alterTable('likes', (table) => {
        table.dropColumn('game_id');
        table
            .integer('review_id')
            .references('id')
            .inTable('reviews')
            .onDelete('CASCADE');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.alterTable('likes', (table) => {
        table.dropColumn('review_id');
    });
}
exports.down = down;
