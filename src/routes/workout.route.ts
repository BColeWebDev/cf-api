import express from "express"
const Router = express.Router()
import exercisesCtrl  from "../controllers/exercises.controller"
import regimentCtrl from "../controllers/regiments.controller"
import TrainingDay from "../controllers/training_day.controller";
import isAuthenticated from "../middleware/authMiddleware";
import isValidUser from "../middleware/validUserIdMiddleware";
// GET - Exercises 
Router.route('/exercises')
    .get(isAuthenticated,exercisesCtrl.GetAllExercises);
// GET - Exercises (Muscle Target)
// GET - Single Body Part
Router.route('/exercises/targets')
    .get(isAuthenticated,exercisesCtrl.GetAllBodyParts)
Router.route('/exercises/targets/:name')
    .get(isAuthenticated,exercisesCtrl.GetSingleBodyPart)

// GET - Get all MuscleGroup
Router.route("/exercises/muscles")
    .get(isAuthenticated,exercisesCtrl.GetAllMuscleGroup)
Router.route("/exercises/muscles/:name")
    .get(isAuthenticated,exercisesCtrl.GetSingleMuscleGroup)
// GET - Get all MuscleGroup

Router.route("/exercises/equipments")
    .get(isAuthenticated,exercisesCtrl.GetAllEquipment)
Router.route("/exercises/equipments/:name")
    .get(isAuthenticated,exercisesCtrl.GetSingleEquipment)
// GET - Get By Name
Router.route('/exercises/name')
    .get(isAuthenticated,exercisesCtrl.GetByName)

// GET - Get By Name
Router.route('/muscleGroup')
    .get(isAuthenticated,exercisesCtrl.GetMuscleGroup)
Router.route('/muscleImages')
    .get(isAuthenticated,exercisesCtrl.GetImages)






// GET,POST - Regiments -> (userid) 
Router.route("/createRegiment")
    .post(isAuthenticated,isValidUser,regimentCtrl.CreateRegimentPlan)
Router.route("/regimentsAll")
    .get(isAuthenticated,regimentCtrl.GetAllRegimentPlan)
    
// GET,PUT,DELETE - Regiments -> (regId) 
Router.route("/singleRegiment/:id")
    .get(isAuthenticated,regimentCtrl.GetSingleRegimentPlan)
    .delete(isAuthenticated,regimentCtrl.DeleteRegimentPlan)
    .put(isAuthenticated,regimentCtrl.UpdateRegimentPlan)

// POST,PUT - Training Days -> (regId)
Router.route("/trainingdays/:id")
    .get(isAuthenticated,TrainingDay.getAllTrainingDays)
    .post(isAuthenticated,TrainingDay.createTrainingDay)
    .put(isAuthenticated,TrainingDay.UpdateTrainingDay)
    .delete(isAuthenticated,TrainingDay.DeleteTrainingDay)
// GET
Router.route("/singleTrainingDay/:id")
    .get(isAuthenticated,TrainingDay.findSingleTrainingDay)



// Ex
Router.route('/routines/:id')
    .get(exercisesCtrl.getAllWorkouts)
    .post(exercisesCtrl.createWorkout)
    .put(exercisesCtrl.updateWorkout)
    .delete(exercisesCtrl.deleteWorkout)


   

export default Router