import mongoose from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IRegimentAtts{
    name:string,
    description:string,
    userid:string,
}
// Extends Mongo Class
export interface RegiementDocument extends mongoose.Document{
    name:string,
    description:string,
    userid:string,
}

interface RegimentModel extends mongoose.Model<RegiementDocument>{
    build(attrs:IRegimentAtts): RegiementDocument;
}


const regimentSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required: true
    }
})

const Regiment = mongoose.model<RegiementDocument,RegimentModel>('Workout',regimentSchema)

export { Regiment }
