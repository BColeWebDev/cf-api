import mongoose from "mongoose"
// Workouts Schema 
 interface WorkoutAttrs{
    name: string,
    equipment: string,
    muscle_target: string,
    bodyPart: string,
    gifUrl: string
    id:string   
    _id?:string
}

interface WorkoutModel extends mongoose.Model<WorkoutDocument>{
    build(attrs:WorkoutAttrs): WorkoutDocument;
}
export interface WorkoutDocument extends mongoose.Document{
    name:string;
    equipment: string;
    muscle_target: string;
    bodyPart: string;
    gifUrl: string;
    id:string;
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
    muscle_target:{
        type:String,
        required: true
    },
    bodyPart:{
        type:String,
        required:true
    },
    gifUrl:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    }
})

const Workout = mongoose.model<WorkoutDocument,WorkoutModel>('Workout',workoutSchema)
export { Workout,WorkoutAttrs }