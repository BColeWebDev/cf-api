"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const custom_errors_1 = require("../errors/custom-errors");
class RequestValidationError extends custom_errors_1.customError {
    errors;
    statusCode = 400;
    constructor(errors) {
        super('Invalid request parameters');
        this.errors = errors;
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        return this.errors.map(error => {
            return {
                message: error.msg,
                field: error.param
            };
        });
    }
}
exports.RequestValidationError = RequestValidationError;
