import { required } from "joi";
import { ObjectId } from "bson";
import mongoose from "mongoose";
import { TrainingDaysAttrs, TrainingDay } from "./trainingdays.model";

// 1. Create an interface representing a document in MongoDB.
export interface IRegimentAttrs {
  name: string;
  description: string;
  userid: ObjectId;
  routines: TrainingDaysAttrs[];
  isCompleted: boolean;
}
// Extends Mongo Class
export interface RegiementDocument extends mongoose.Document {
  name: string;
  description: string;
  userid: ObjectId;
  routines: TrainingDaysAttrs[];
  isCompleted: boolean;
}

interface RegimentModel extends mongoose.Model<RegiementDocument> {
  build(attrs: IRegimentAttrs): RegiementDocument;
}

const regimentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userid: {
    type: ObjectId,
    required: true,
  },
  routines: {
    type: [TrainingDay.schema],
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
    required: true,
  },
});
// Defines Schema to be built
regimentSchema.statics.build = (attrs: IRegimentAttrs) => {
  return new Regiment(attrs);
};
const Regiment = mongoose.model<RegiementDocument, RegimentModel>(
  "Regiment",
  regimentSchema
);

export { Regiment };
