import express from "express"
const Router = express.Router()
import exercisesCtrl  from "../controllers/exercises.controller"
import regimentCtrl from "../controllers/regiments.controller"
import TrainingDay from "../controllers/training_day.controller";

// GET - Exercises 
Router.route('/exercises')
    .get(exercisesCtrl.GetAllExercises);
// GET - Exercises (Muscle Target)
// GET - Single Body Part
Router.route('/exercises/targets')
    .get(exercisesCtrl.GetAllBodyParts)
Router.route('/exercises/targets/:name')
    .get(exercisesCtrl.GetSingleBodyPart)

// GET - Get all MuscleGroup
Router.route("/exercises/muscles")
    .get(exercisesCtrl.GetAllMuscleGroup)
Router.route("/exercises/muscles/:name")
    .get(exercisesCtrl.GetSingleMuscleGroup)
// GET - Get all MuscleGroup

Router.route("/exercises/equipments")
    .get(exercisesCtrl.GetAllEquipment)
Router.route("/exercises/equipments/:name")
    .get(exercisesCtrl.GetSingleEquipment)
// GET - Get By Name
Router.route('/exercises/name')
    .get(exercisesCtrl.GetByName)

// GET - Get By Name
Router.route('/muscleGroup')
    .get(exercisesCtrl.GetMuscleGroup)
Router.route('/muscleImages')
    .get(exercisesCtrl.GetImages)






// GET,POST - Regiments -> (userid) 
Router.route("/regiments/:id")
    .get(regimentCtrl.GetAllRegimentPlan)
    .post(regimentCtrl.CreateRegimentPlan)
   
    
// GET,PUT,DELETE - Regiments -> (regId) 
Router.route("/singleRegiment/:id")
    .get(regimentCtrl.GetSingleRegimentPlan)
    .delete(regimentCtrl.DeleteRegimentPlan)
    .put(regimentCtrl.UpdateRegimentPlan)

// POST,PUT - Training Days -> (regId)
Router.route("/trainingdays/:id")
    .get(TrainingDay.getAllTrainingDays)
    .post(TrainingDay.createTrainingDay)
    .put(TrainingDay.UpdateTrainingDay)
    .delete(TrainingDay.DeleteTrainingDay)
// GET
Router.route("/singleTrainingDay/:id")
    .get(TrainingDay.findSingleTrainingDay)



// Ex
Router.route('/routines/:id')
    .get(exercisesCtrl.getAllWorkouts)
    .post(exercisesCtrl.createWorkout)
    .put(exercisesCtrl.updateWorkout)
    .delete(exercisesCtrl.deleteWorkout)


   

export default Router