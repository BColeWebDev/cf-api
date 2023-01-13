import mongoose from "mongoose";

interface TrainingDaysAttrs{
    description:string,
    day: string,
}


export interface TrainingDocument extends mongoose.Document{
    description:string,
    day:string
}

interface TrainingDayModel  extends mongoose.Model<TrainingDocument>{
    build(attrs:TrainingDaysAttrs): TrainingDocument
}

const trainingSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true 
    },
    equipment:{
        type:String,
        required:true 
    }
})

const TrainingDay = mongoose.model<TrainingDayModel,TrainingDayModel>('Workout',trainingSchema)
export {TrainingDay}