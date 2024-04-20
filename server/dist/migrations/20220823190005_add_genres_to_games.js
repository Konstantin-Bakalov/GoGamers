"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.createTable('genres', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable().unique();
            table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        });
        yield knex.schema.createTable('game_genres', (table) => {
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
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTable('game_genres');
        yield knex.schema.dropTable('genres');
    });
}
exports.down = down;
