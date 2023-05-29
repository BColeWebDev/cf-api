"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const custom_errors_1 = require("./custom-errors");
class BadRequestError extends custom_errors_1.customError {
    statusCode = 400;
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serializeErrors() {
        return [{
                message: this.message,
            }];
    }
}
exports.BadRequestError = BadRequestError;
