"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Hashing Password using Bcrypt
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// rounds - number of hashes
// password - client enter password 
const hash = async ({ rounds, password }) => {
    const salt = await bcryptjs_1.default.genSalt(rounds);
    return bcryptjs_1.default.hash(password, salt);
};
// bodyPassword compared from client-side
// dbPassword compared from database
const compare = async (bodyPassword, dbPassword) => {
    return bcryptjs_1.default.compare(bodyPassword, dbPassword);
};
exports.default = { hash, compare };
