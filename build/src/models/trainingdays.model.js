"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingDay = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const workout_model_1 = require("./workout.model");
const trainingSchema = new mongoose_1.default.Schema({
    description: {
        type: String,
    },
    name: {
        type: String,
    },
    day: {
        type: String,
        unique: true
    },
    workouts: {
        type: [workout_model_1.Workout.schema]
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
});
const TrainingDay = mongoose_1.default.model('TrainingDay', trainingSchema);
exports.TrainingDay = TrainingDay;
