import mongoose from "mongoose";
import { WorkoutAttrs, Workout } from "./workout.model";
interface TrainingDaysAttrs {
  description: string;
  name: string;
  day: string;
  workouts: WorkoutAttrs[];
  primaryMuscleGroup: string[];
  secondaryMuscleGroup: string[];
  _id?: string;
  isCompleted?: boolean;
}

const trainingSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  name: {
    type: String,
  },
  day: {
    type: String,
  },
  workouts: {
    type: [Workout.schema],
  },
  primaryMuscleGroup: {
    type: [String],
  },
  secondaryMuscleGroup: {
    type: [String],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const TrainingDay = mongoose.model("TrainingDay", trainingSchema);
export { TrainingDaysAttrs, TrainingDay };
