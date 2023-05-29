"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const custom_errors_1 = require("./custom-errors");
class NotFoundError extends custom_errors_1.customError {
    statusCode = 404;
    message = 'Not found';
    constructor() {
        super('Not found');
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeErrors() {
        return [{
                message: this.message,
            }];
    }
}
exports.NotFoundError = NotFoundError;
