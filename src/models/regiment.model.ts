import { required } from "joi";
import { ObjectId } from "bson";
import mongoose from "mongoose";
import { TrainingDaysAttrs, TrainingDay } from "./trainingdays.model";
import { WorkoutAttrs } from "./workout.model";

// TODO: Add Days array to schema

// 1. Create an interface representing a document in MongoDB.
export interface IRegimentAttrs {
  name: string;
  description: string;
  userid: ObjectId;
  routines: TrainingDaysAttrs[];
  isCompleted: boolean;
  days: String[];
}
// Extends Mongo Class
export interface RegiementDocument extends mongoose.Document {
  name: string;
  description: string;
  userid: ObjectId;
  routines: TrainingDaysAttrs[];
  isCompleted: boolean;
  days: String[];
  sharables: boolean;
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
  days: {
    type: [String],
    required: true,
  },
  sharables: {
    type: Boolean,
    required: false,
  },
  isShared: {
    type: Boolean,
    required: false,
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

class RegimentsQueries {
  static UpdateRegimentQuery(id: string, data: WorkoutAttrs) {
    let arrayFilter = [{ "x.id": id }];
    let query = {
      // update query
      description: "TESTS",
      "routines.$[].workouts.$[x].name": data.name,
      "routines.$[].workouts.$[x].equipment": data.equipment,
      "routines.$[].workouts.$[x].bodyPart": data.bodyPart,
      "routines.$[].workouts.$[x].gifUrl": data.gifUrl,
      "routines.$[].workouts.$[x].muscle_target": data.muscle_target,
    };

    return { query, arrayFilter };
  }
  static DeleteRegimentQuery(id: string) {
    let query = {
      routines: {
        workouts: {
          id: id,
        },
      },
    };
    console.log("query", query);
    return { query };
  }
}
export { Regiment, RegimentsQueries };
