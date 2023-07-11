import { ObjectId } from "bson";
import mongoose from "mongoose";
import {WorkoutAttrs,Workout} from "./workout.model"
interface TrainingDaysAttrs{
 
    description:string,
    name:string,
    day: string,
    workouts:WorkoutAttrs[]
    _id?:string

}


export interface TrainingDocument extends mongoose.Document{
    description:string,
    name:string,
    day:string,
    workouts:WorkoutAttrs[]
}

interface TrainingDayModel  extends mongoose.Model<TrainingDocument>{
    build(attrs:TrainingDaysAttrs): TrainingDocument
}

const trainingSchema = new mongoose.Schema({
    description:{
        type:String,
        
    },
    name:{
        type:String,
        
    },
    day:{
        type:String,
     
    },
    workouts:{
        type:[Workout.schema]
    },
    isCompleted:{
        type:Boolean,
        default: false
    },

})

const TrainingDay = mongoose.model<TrainingDayModel,TrainingDayModel>('TrainingDay',trainingSchema)
export {TrainingDay, TrainingDaysAttrs}