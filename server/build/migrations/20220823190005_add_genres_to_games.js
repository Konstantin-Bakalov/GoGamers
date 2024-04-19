"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.createTable('genres', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable().unique();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });
    await knex.schema.createTable('game_genres', (table) => {
        table.increments('id').primary();
        table
            .integer('game_id')
            .notNullable()
            .references('id')
            .inTable('games')
            .onDelete('CASCADE');
        table
            .integer('genre_id')
            .notNullable()
            .references('id')
            .inTable('genres')
            .onDelete('CASCADE');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('game_genres');
    await knex.schema.dropTable('genres');
}
exports.down = down;
