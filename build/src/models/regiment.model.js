"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Regiment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const trainingdays_model_1 = require("./trainingdays.model");
const regimentSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    userid: {
        type: Number,
    },
    routines: {
        type: [trainingdays_model_1.TrainingDay.schema],
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
});
// Defines Schema to be built 
regimentSchema.statics.build = (attrs) => {
    return new Regiment(attrs);
};
const Regiment = mongoose_1.default.model('Regiment', regimentSchema);
exports.Regiment = Regiment;
