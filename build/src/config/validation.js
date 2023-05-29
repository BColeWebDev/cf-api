"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Validation Schema
const registerSchema = joi_1.default.object({
    first_name: joi_1.default.string()
        .min(2)
        .max(35)
        .required()
        .messages({
        'string.empty': `first name cannot be an empty field`,
        'string.min': `first name should have a minimum length of 2 characters`,
        'string.max': `last name should have a minimum length of 35 characters`,
        'any.required': `first name is required field`
    }),
    last_name: joi_1.default.string()
        .min(2)
        .max(35)
        .required()
        .messages({
        'string.empty': `last name cannot be an empty field`,
        'string.min': `last name should have a minimum length of 2 characters`,
        'string.max': `last name should have a minimum length of 35 characters`,
        'any.required': `last name is required field`
    }),
    email: joi_1.default.string()
        .max(30)
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .messages({
        'string.empty': `"email" cannot be an empty field`,
        'string.max': `email should have a minimum length of 30 characters`,
        'string.email': "must be a valid email",
        'any.required': `"email" is a required field`
    }),
    //Minimum eight characters, at least one letter and one number:
    password: joi_1.default.string()
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .required()
        .messages({
        'string.empty': `password cannot be an empty field`,
        'string.min': `password should have a minimum length of 8 characters`,
        'string.pattern.base': `Invalid Password must contain: captialize letter, lower case letter, & special character`,
        'any.required': `password is required field`
    }),
    age: joi_1.default.number()
        .required()
        .min(1)
        .max(100)
        .messages({
        'number.empty': `age cannot be an empty field`,
        'number.min': `Invalid! age cannot be less than 1. Please try again.`,
        'number.max': `Invalid! age cannot be over 100. Please try again.`
    }),
    sex: joi_1.default.string()
        .max(1)
        .required(),
    bio: joi_1.default
        .string()
        .messages({
        'string.empty': `age cannot be an empty field`,
        'string.min': `Invalid! age cannot be less than 1. Please try again.`,
        'string.max': `Invalid! age cannot be over 100. Please try again.`
    }),
    experience: joi_1.default
        .string()
        .required()
        .messages({
        'string.empty': `experience cannot be an empty field`
    }),
    crown_member: joi_1.default
        .boolean()
        .required()
        .messages({
        'boolean.empty': `Crown Member cannot be an empty field`
    }),
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string()
        .max(30)
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .messages({
        'string.empty': `email cannot be an empty field`,
        'string.max': `email should have a max of length of 30 characters`,
        'string.email': "must be a valid email",
        'any.required': `email is a required field`
    }),
    password: joi_1.default.string()
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .required()
        .messages({
        'string.empty': `password cannot be an empty field`,
        'string.min': `email should have a minimum length of 8 characters`,
        'string.pattern.base': `Invalid Password must contain: minimum 8 characters, captialize letter, lower case letter, & special character`,
        'any.required': `password is required field`
    })
});
const emailSchema = joi_1.default.object({
    email: joi_1.default.string()
        .max(30)
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .messages({
        'string.empty': `email cannot be an empty field`,
        'string.max': `email should have a max of length of 30 characters`,
        'string.email': "must be a valid email",
        'any.required': `email is a required field`
    })
});
class Validation {
    // Validation for registering Register
    registerValidation = (data) => {
        // checks if text is not blank   
        const response = registerSchema.validate({ ...data }, { abortEarly: false });
        return response;
    };
    // Login Valiation
    loginValidation = (data) => {
        const { email, password } = data;
        const response = loginSchema.validate({ email, password }, { abortEarly: false });
        return response;
    };
    // Forgot password validation
    forgotValidation = (data) => {
        const { email } = data;
        const response = emailSchema.validate({ email }, { abortEarly: false });
        return response;
    };
}
exports.default = new Validation();
