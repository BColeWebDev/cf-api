"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModel = void 0;
const mongoose_1 = require("mongoose");
const sessionSchema = new mongoose_1.Schema({
    session: String,
    session_id: String,
    expire: { type: Date, required: true, default: new Date(), expires: "14d" },
});
exports.SessionModel = (0, mongoose_1.model)("Session", sessionSchema);
exports.default = exports.SessionModel;
