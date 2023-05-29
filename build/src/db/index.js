"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(`${process.env.NODE_ENV !== 'production' ? process.env.MONGO_URL_TEST : process.env.MONGO_URL}`).then(() => {
    console.log("Connected to Database!");
}).catch((e) => {
    console.error('Connection error', e.message);
});
const db = mongoose_1.default.connection;
exports.default = db;
