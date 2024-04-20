"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const config_1 = require("./config");
// Update with your config settings.
const knexConfig = {
    development: Object.assign({ client: 'postgresql', connection: config_1.config.get('db'), pool: {
            min: 2,
            max: 10,
        }, migrations: {
            tableName: 'knex_migrations',
        } }, (0, objection_1.knexSnakeCaseMappers)()),
};
exports.default = knexConfig;
