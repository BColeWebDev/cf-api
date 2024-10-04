import {
  Register,
  Regiment,
  Login,
  forgotPassword,
  Workouts,
  Nutritions,
  Sharables,
} from "./interfaces/index";
import Joi, { required } from "joi";

// Validation Schema
const registerSchema = Joi.object({
  first_name: Joi.string().min(2).max(35).required().messages({
    "string.empty": `first name cannot be an empty field`,
    "string.min": `first name should have a minimum length of 2 characters`,
    "string.max": `last name should have a minimum length of 35 characters`,
    "any.required": `first name is required field`,
  }),
  last_name: Joi.string().min(2).max(35).required().messages({
    "string.empty": `last name cannot be an empty field`,
    "string.min": `last name should have a minimum length of 2 characters`,
    "string.max": `last name should have a minimum length of 35 characters`,
    "any.required": `last name is required field`,
  }),
  email: Joi.string()
    .max(30)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .messages({
      "string.empty": `"email" cannot be an empty field`,
      "string.max": `email should have a minimum length of 30 characters`,
      "string.email": "must be a valid email",
      "any.required": `"email" is a required field`,
    }),
  //Minimum eight characters, at least one letter and one number:
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required()
    .messages({
      "string.empty": `password cannot be an empty field`,
      "string.min": `password should have a minimum length of 8 characters`,
      "string.pattern.base": `Invalid Password must contain: captialize letter, lower case letter, & special character`,
      "any.required": `password is required field`,
    }),

  age: Joi.number().required().min(1).max(100).messages({
    "number.empty": `age cannot be an empty field`,
    "number.min": `Invalid! age cannot be less than 1. Please try again.`,
    "number.max": `Invalid! age cannot be over 100. Please try again.`,
  }),
  gender: Joi.string().max(1).required(),
  bio: Joi.string().min(2).max(140).messages({
    "string.empty": `bio cannot be an empty field`,
    "string.min": `Invalid! bio cannot be less than 1. Please try again.`,
    "string.max": `Invalid! bio cannot be over 140. Please try again.`,
  }),
  primary_goals: Joi.string(),
  performance_goals: Joi.string(),
  lifestyle_goals: Joi.string(),
  equipment_access: Joi.string(),
  weight: Joi.string().required(),
  height: Joi.string().required(),
  experience: Joi.string().required().messages({
    "string.empty": `experience cannot be an empty field`,
  }),

  crown_member: Joi.boolean().required().messages({
    "boolean.empty": `Crown Member cannot be an empty field`,
  }),
  device: Joi.string().required().messages({
    "string.empty": `device cannot be an empty field`,
  }),
});

const loginSchema = Joi.object({
  email: Joi.string()

    .max(30)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .messages({
      "string.empty": `email cannot be an empty field`,
      "string.max": `email should have a max of length of 30 characters`,
      "string.email": "must be a valid email",
      "any.required": `email is a required field`,
    }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required()
    .messages({
      "string.empty": `password cannot be an empty field`,
      "string.min": `email should have a minimum length of 8 characters`,
      "string.pattern.base": `Invalid Password must contain: minimum 8 characters, captialize letter, lower case letter, & special character`,
      "any.required": `password is required field`,
    }),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .max(30)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .messages({
      "string.empty": `email cannot be an empty field`,
      "string.max": `email should have a max of length of 30 characters`,
      "string.email": "must be a valid email",
      "any.required": `email is a required field`,
    }),
});
const regimentSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": `name cannot be an empty field`,
  }),
  description: Joi.string().required().messages({
    "string.empty": `description cannot be an empty field`,
  }),
  userid: Joi.string().required().messages({
    "string.empty": `id cannot be an empty field`,
  }),
});

const workoutSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": `name cannot be an empty`,
    "any.required": `experience is required`,
  }),
  id: Joi.string().required().messages({
    "string.empty": `id cannot be an empty`,
    "any.required": `id is required`,
  }),
  bodyPart: Joi.string().required().messages({
    "string.empty": `bodyPart cannot be an empty`,
    "any.required": `bodyPart is required`,
  }),
  muscle_target: Joi.string().required().messages({
    "string.empty": `muscle_target cannot be an empty`,
    "any.required": `muscle_target is required`,
  }),
  gifUrl: Joi.string().required().messages({
    "string.empty": `gifUrl cannot be an empty`,
    "any.required": `gifUrl is required`,
  }),
  equipment: Joi.string().required().messages({
    "string.empty": `equipment cannot be an empty`,
    "any.required": `equipment is required`,
  }),
}).unknown();
const nutritionsSchema = Joi.object({
  name: Joi.string().required().min(3).max(30).messages({
    "string.empty": `name cannot be an empty`,
    "any.required": `experience is required`,
    "string.min": `first name should have a minimum length of 3 characters`,
    "string.max": `last name should have a minimum length of 30 characters`,
  }),
});
const sharableSchema = Joi.object({
  sharable_name: Joi.string().required().min(3).max(30).messages({
    "string.empty": `sharable_name cannot be an empty`,
    "any.required": `sharable_name is required`,
    "string.min": `sharable_name should have a minimum length of 3 characters`,
    "string.max": `sharable_name should have a minimum length of 30 characters`,
  }),
  created_by: Joi.string().required().min(3).max(30).messages({
    "string.empty": `created_by cannot be an empty`,
    "any.required": `created_by is required`,
    "string.min": `created_by should have a minimum length of 3 characters`,
    "string.max": `created_by should have a minimum length of 30 characters`,
  }),
  regiment_difficulty: Joi.string()
    .required()
    .valid("beginner", "intermediate", "advance")
    .messages({
      "string.empty": `regiment_difficulty cannot be an empty`,
      "any.required": `regiment_difficulty is required`,
      "string.min": `regiment_difficulty should have a minimum length of 3 characters`,
      "string.max": `regiment_difficulty should have a minimum length of 30 characters`,
    }),
}).unknown();
class Validation {
  // Validation for registering Register
  registerValidation = (data: Register) => {
    // checks if text is not blank
    console.log("registers", data);
    const response = registerSchema.validate(
      { ...data },
      { abortEarly: false }
    );
    return response;
  };
  // Login Valiation
  loginValidation = (data: Login) => {
    const { email, password } = data;
    const response = loginSchema.validate(
      { email, password },
      { abortEarly: false }
    );
    return response;
  };
  // Forgot password validation
  forgotValidation = (data: forgotPassword) => {
    const { email } = data;
    const response = emailSchema.validate({ email }, { abortEarly: false });
    return response;
  };
  createRegimentValidation = (data: Regiment) => {
    const response = regimentSchema.validate(data, { abortEarly: false });
    console.log("*RESPONSE*", response);
    return response;
  };
  createWorkoutValidation = (data: Workouts) => {
    const response = workoutSchema.validate(data, { abortEarly: false });

    return response;
  };
  createNutritionPlan = (data: Nutritions) => {
    const response = nutritionsSchema.validate(data, { abortEarly: false });
    return response;
  };
  createSharableValidation = (data: Sharables) => {
    const response = sharableSchema.validate(data, { abortEarly: false });
    return response;
  };
}

export default new Validation();
