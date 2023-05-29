"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sorting_1 = __importDefault(require("./sorting"));
const Pagination = (req, data) => {
    const page = Number(req.query.page) ?? 1;
    const pageDisplay = Number(req.query.limit) ?? 10;
    const startIndex = (page - 1) * pageDisplay;
    const endIndex = page * pageDisplay;
    const results = data.slice(startIndex, endIndex);
    if (req.query.sort !== undefined) {
        return (0, sorting_1.default)(req, results);
    }
    else {
        return results;
    }
};
exports.default = Pagination;
