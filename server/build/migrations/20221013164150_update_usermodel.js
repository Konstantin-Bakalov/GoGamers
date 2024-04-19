"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.alterTable('users', (table) => {
        table.dropColumn('password');
        table.dropUnique(['name']);
        table.text('email').notNullable().unique();
        table.text('profile_picture').notNullable();
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.alterTable('users', (table) => {
        table.dropColumn('email');
        table.dropColumn('profile_picture');
        table.text('password').notNullable();
    });
}
exports.down = down;
