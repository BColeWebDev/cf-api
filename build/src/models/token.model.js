"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const mongoose_1 = require("mongoose");
const ObjectId = mongoose_1.Schema.Types.ObjectId;
const tokenSchema = new mongoose_1.Schema({
    _userId: {
        type: ObjectId,
        required: true,
        ref: "User",
    },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: new Date(), expires: 43200 },
});
exports.Token = (0, mongoose_1.model)("Token", tokenSchema);
exports.default = exports.Token;
