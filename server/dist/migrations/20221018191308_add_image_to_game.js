"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.createTable('media', (table) => {
        table.increments('id').primary();
        table
            .integer('game_id')
            .references('id')
            .inTable('games')
            .notNullable()
            .onDelete('CASCADE');
        table.enu('type', ['image', 'video'], {
            useNative: true,
            enumName: 'type_media',
        });
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTableIfExists('media');
}
exports.down = down;
