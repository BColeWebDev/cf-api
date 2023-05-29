"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const exercises_controller_1 = __importDefault(require("../controllers/exercises.controller"));
const regiments_controller_1 = __importDefault(require("../controllers/regiments.controller"));
const training_day_controller_1 = __importDefault(require("../controllers/training_day.controller"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
// GET - Exercises 
Router.route('/exercises')
    .get(authMiddleware_1.default, exercises_controller_1.default.GetAllExercises);
// GET - Exercises (Muscle Target)
// GET - Single Body Part
Router.route('/exercises/targets')
    .get(authMiddleware_1.default, exercises_controller_1.default.GetAllBodyParts);
Router.route('/exercises/targets/:name')
    .get(authMiddleware_1.default, exercises_controller_1.default.GetSingleBodyPart);
// GET - Get all MuscleGroup
Router.route("/exercises/muscles")
    .get(authMiddleware_1.default, exercises_controller_1.default.GetAllMuscleGroup);
Router.route("/exercises/muscles/:name")
    .get(authMiddleware_1.default, exercises_controller_1.default.GetSingleMuscleGroup);
// GET - Get all MuscleGroup
Router.route("/exercises/equipments")
    .get(authMiddleware_1.default, exercises_controller_1.default.GetAllEquipment);
Router.route("/exercises/equipments/:name")
    .get(authMiddleware_1.default, exercises_controller_1.default.GetSingleEquipment);
// GET - Get By Name
Router.route('/exercises/name')
    .get(authMiddleware_1.default, exercises_controller_1.default.GetByName);
// GET - Get By Name
Router.route('/muscleGroup')
    .get(authMiddleware_1.default, exercises_controller_1.default.GetMuscleGroup);
Router.route('/muscleImages')
    .get(authMiddleware_1.default, exercises_controller_1.default.GetImages);
// GET,POST - Regiments -> (userid) 
Router.route("/regiments/:id")
    .get(regiments_controller_1.default.GetAllRegimentPlan)
    .post(regiments_controller_1.default.CreateRegimentPlan);
// GET,PUT,DELETE - Regiments -> (regId) 
Router.route("/singleRegiment/:id")
    .get(regiments_controller_1.default.GetSingleRegimentPlan)
    .delete(regiments_controller_1.default.DeleteRegimentPlan)
    .put(regiments_controller_1.default.UpdateRegimentPlan);
// POST,PUT - Training Days -> (regId)
Router.route("/trainingdays/:id")
    .get(training_day_controller_1.default.getAllTrainingDays)
    .post(training_day_controller_1.default.createTrainingDay)
    .put(training_day_controller_1.default.UpdateTrainingDay)
    .delete(training_day_controller_1.default.DeleteTrainingDay);
// GET
Router.route("/singleTrainingDay/:id")
    .get(training_day_controller_1.default.findSingleTrainingDay);
// Ex
Router.route('/routines/:id')
    .get(exercises_controller_1.default.getAllWorkouts)
    .post(exercises_controller_1.default.createWorkout)
    .put(exercises_controller_1.default.updateWorkout)
    .delete(exercises_controller_1.default.deleteWorkout);
exports.default = Router;
