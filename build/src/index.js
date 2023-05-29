"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = __importDefault(require("./db"));
const config_1 = require("../config");
const PORT = config_1.config.server.port || 8000;
const start = async () => {
    db_1.default.on('error', console.error.bind(console, 'MongoDB connection error:'));
    app_1.app.listen(PORT, () => {
        console.log(`Listening on port http://localhost:${PORT}`);
    });
};
start();
