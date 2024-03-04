import { ISets } from "config/interfaces";
import mongoose from "mongoose";
// Workouts Schema
interface WorkoutAttrs {
  name: string;
  equipment: string;
  muscle_target: string;
  bodyPart: string;
  gifUrl: string;
  id: string;
  _id?: string;
  restTime?: string;
  sets?: ISets[];
}

// interface WorkoutModel extends mongoose.Model<WorkoutDocument> {
//   build(attrs: WorkoutAttrs): WorkoutDocument;
// }
export interface WorkoutDocument extends mongoose.Document {
  name: string;
  equipment: string;
  muscle_target: string;
  bodyPart: string;
  gifUrl: string;
  id: string;
  restTime: string;
  sets: ISets[];
}

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  equipment: {
    type: String,
    required: true,
  },
  muscle_target: {
    type: String,
    required: true,
  },
  bodyPart: {
    type: String,
    required: true,
  },
  gifUrl: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  // In between rest time on sets
  restTime: {
    type: String,
    default: "",
  },

  sets: {
    type: Object,
    default: [],
  },
});

const Workout = mongoose.model<WorkoutDocument>("Workout", workoutSchema);
export { Workout, WorkoutAttrs };
