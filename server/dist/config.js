"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const convict_1 = __importDefault(require("convict"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const config = (0, convict_1.default)({
    db: {
        user: {
            doc: 'DB User',
            env: 'DB_USER',
            default: 'username',
        },
        password: {
            doc: 'DB Password',
            env: 'DB_PASSWORD',
            default: 'password',
        },
        database: {
            doc: 'DB Name',
            env: 'DB_NAME',
            default: 'test_database',
        },
        host: {
            env: 'DB_HOST',
            format: 'String',
            default: 'localhost',
        },
        port: {
            env: 'DB_PORT',
            format: 'port',
            default: 5432,
        },
    },
    server: {
        port: {
            env: 'SERVER_PORT',
            format: 'port',
            default: 3001,
        },
        jwt_key: {
            env: 'JWT_KEY',
            format: 'String',
            default: '859e97c93ab485fed675cb4aded55c45da62df',
        },
    },
    cloudinary: {
        name: {
            env: 'CLOUD_NAME',
            default: '',
        },
        key: {
            env: 'CLOUD_KEY',
            default: '',
        },
        secret: {
            env: 'CLOUD_SECRET',
            format: String,
            default: '',
        },
        preset: {
            env: 'PRESET',
            format: String,
            default: '',
        },
    },
});
exports.config = config;
config.validate();
