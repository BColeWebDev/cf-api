import mongoose from "mongoose"
// Workouts Schema 
interface WorkoutAttrs{
    name: string,
    equipment: string,
    muscle_target: string,
    bodyPart: string,
    imageUrl: string
}

interface WorkoutModel extends mongoose.Model<WorkoutDocument>{
    build(attrs:WorkoutAttrs): WorkoutDocument;
}
export interface WorkoutDocument extends mongoose.Document{
    name:string;
    equipment: string;
    muscle_target: string;
    bodyPart: string;
    imageUrl: string;
}

const workoutSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    equipment:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    bodyPart:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }
})

const Workout = mongoose.model<WorkoutDocument,WorkoutModel>('Workout',workoutSchema)
export { Workout }