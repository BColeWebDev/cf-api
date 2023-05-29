"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const workoutSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    equipment: {
        type: String,
        required: true
    },
    muscle_target: {
        type: String,
        required: true
    },
    bodyPart: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});
const Workout = mongoose_1.default.model('Workout', workoutSchema);
exports.Workout = Workout;
