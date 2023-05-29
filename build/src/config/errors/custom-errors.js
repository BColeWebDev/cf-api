"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customError = void 0;
class customError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, customError.prototype);
    }
}
exports.customError = customError;
