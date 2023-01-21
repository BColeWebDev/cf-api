import express from "express"
const Router = express.Router()
import exercisesCtrl  from "../controllers/workouts.controller"
import workoutCtrl from "../controllers/regiments.controller"
// GET - Exercises 
Router.route('/exercises')
    .get(exercisesCtrl.GetAllExercises);

Router.route("/regiments")
    .get(workoutCtrl.GetAllWorkoutPlan)
    .get(workoutCtrl.GetSingleWorkoutPlan)
    .post(workoutCtrl.CreateWorkoutPlan)
    .put(workoutCtrl.UpdateWorkoutPlan)
    .delete(workoutCtrl.DeleteWorkoutPlan)




export default Router