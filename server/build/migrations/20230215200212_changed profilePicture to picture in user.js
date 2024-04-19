"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.alterTable('users', (table) => {
        table.renameColumn('profilePicture', 'picture');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.alterTable('users', (table) => {
        table.renameColumn('picture', 'profilePicture');
    });
}
exports.down = down;
