import express from "express";
const Router = express.Router();
import exercisesCtrl from "../controllers/exercises.controller";
import regimentCtrl from "../controllers/regiments.controller";
import trainingCtrl from "../controllers/training_day.controller";
import isAuthenticated from "../middleware/authMiddleware";
import middleware from "../middleware/validationMiddlware";
import isValidUser from "../middleware/validUserIdMiddleware";
// GET - Exercises
Router.route("/exercises").get(isAuthenticated, exercisesCtrl.GetAllExercises);
// GET - Exercises (Muscle Target)
// GET - Single Body Part
Router.route("/exercises/targets").get(
  isAuthenticated,
  exercisesCtrl.GetAllBodyParts
);
Router.route("/exercises/targets/:name").get(
  isAuthenticated,
  exercisesCtrl.GetSingleBodyPart
);

// GET - Get all MuscleGroup
Router.route("/exercises/muscles").get(
  isAuthenticated,
  exercisesCtrl.GetAllMuscleGroup
);
Router.route("/exercises/muscles/:name").get(
  isAuthenticated,
  exercisesCtrl.GetSingleMuscleGroup
);
// GET - Get all MuscleGroup

Router.route("/exercises/equipments").get(
  isAuthenticated,
  exercisesCtrl.GetAllEquipment
);
Router.route("/exercises/equipments/:name").get(
  isAuthenticated,
  exercisesCtrl.GetSingleEquipment
);
// GET - Get By Name
Router.route("/exercises/name").get(isAuthenticated, exercisesCtrl.GetByName);

Router.route("/muscleImages").get(isAuthenticated, exercisesCtrl.GetImages);

// GET,POST - Regiments -> (userid)
Router.route("/createRegiment").post(
  isAuthenticated,
  regimentCtrl.CreateRegimentPlan
);
Router.route("/regimentsAll/:id").get(
  isAuthenticated,
  regimentCtrl.GetAllRegimentPlan
);
Router.route('/regimentsAll/:id/completed')
      .post(regimentCtrl.regimentAllCompleted)
// GET,PUT,DELETE - Regiments -> (regId)
Router.route("/singleRegiment/:id")
  .get(isAuthenticated, regimentCtrl.GetSingleRegimentPlan)
  .delete(isAuthenticated, regimentCtrl.DeleteRegimentPlan)
  .put(isAuthenticated, regimentCtrl.UpdateRegimentPlan);

// POST,PUT - Training Days -> (regId)
Router.route("/trainingdays/:id")
  .get(isAuthenticated, trainingCtrl.getAllTrainingDays)
  .post(isAuthenticated, trainingCtrl.createTrainingDay)
  .put(isAuthenticated, trainingCtrl.UpdateTrainingDay);
Router.route("/trainingdays/:id/delete").put(
  isAuthenticated,
  trainingCtrl.DeleteTrainingDay
);

// POST - marked training day completed 
Router.route('/trainingdays/:id/completed')
      .post(trainingCtrl.trainingDayIsCompleted)


// GET
Router.route("/singleTrainingDay/:id").get(
  isAuthenticated,
  trainingCtrl.findSingleTrainingDay
);
// WORKOUTS
Router.route("/routines/:id")
  .get(isAuthenticated, exercisesCtrl.getAllWorkouts)
  .post(isAuthenticated, middleware.isValidWorkout, exercisesCtrl.createWorkout)
  .put(isAuthenticated, exercisesCtrl.updateWorkout)

Router.route("/routines/:id/delete")
  .put(isAuthenticated, exercisesCtrl.deleteWorkout);

export default Router;
