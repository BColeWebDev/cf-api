import express from "express"
const Router = express.Router()
import exercisesCtrl  from "../controllers/workouts.controller"
import workoutCtrl from "../controllers/regiments.controller"
// GET - Exercises 
Router.route('/exercises')
    .get(exercisesCtrl.GetAllExercises);
// GET - Exercises (Muscle Target)
// GET - Single Body Part
Router.route('/targets')
    .get(exercisesCtrl.GetAllBodyParts)
Router.route('/targets/:name')
    .get(exercisesCtrl.GetSingleBodyPart)

// GET - Get all MuscleGroup
Router.route("/muscles")
    .get(exercisesCtrl.GetAllMuscleGroup)
Router.route("/muscles/:name")
    .get(exercisesCtrl.GetSingleMuscleGroup)


// GET - Get all MuscleGroup

Router.route("/equipments")
    .get(exercisesCtrl.GetAllEquipment)
Router.route("/equipments/:name")
    .get(exercisesCtrl.GetSingleEquipment)

// GET - Get By Name
Router.route('/name')
    .get(exercisesCtrl.GetByName)


Router.route("/regiments")
    .get(workoutCtrl.GetAllWorkoutPlan)
    .get(workoutCtrl.GetSingleWorkoutPlan)
    .post(workoutCtrl.CreateWorkoutPlan)
    .put(workoutCtrl.UpdateWorkoutPlan)
    .delete(workoutCtrl.DeleteWorkoutPlan)




export default Router