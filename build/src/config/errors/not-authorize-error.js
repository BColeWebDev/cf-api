"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorizedError = void 0;
const custom_errors_1 = require("./custom-errors");
class NotAuthorizedError extends custom_errors_1.customError {
    statusCode = 401;
    message = 'Unauthorized Access';
    constructor() {
        super('Unauthorized Access');
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
    serializeErrors() {
        return [{
                message: this.message,
            }];
    }
}
exports.NotAuthorizedError = NotAuthorizedError;
