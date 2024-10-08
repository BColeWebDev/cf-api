let error: string[] = [];
import { Response, Request, json } from "express";
import Pagination from "../middleware/pagination";
import Sorting from "../middleware/sorting";
import { Regiment } from "../models/regiment.model";
// Call 3rd Party endpoint

import Filtering from "../middleware/filtering";
import sample from "../config/data";
import {
  MuscleGroupProxy,
  MuscleImageGenerator,
  WorkoutsProxy,
} from "../config/services/workouts.service";
import { writeData } from "../db/redis";

//    ***EXERCISES***
// GET - All Excercises route
const GetAllExercises = async (req: Request, res: Response) => {
  const page = req.query.page;
  const pageDisplay = req.query.limit;
  const sortation = req.query.sort;
  const filters = req.query.filters;
  console.log("page", pageDisplay);
  if (page === undefined || pageDisplay === undefined) {
    return res.status(400).json({ error: "Page Number or Page Limit Missing" });
  }

  try {
    // let items = sample;
    let items = await WorkoutsProxy("get", `/exercises?limit=${pageDisplay}`);
    if (sortation !== undefined) {
      items = Sorting(req, items);
    }
    if (filters !== undefined) {
      items = Filtering(req, items);
    }

    // // Pagination Check
    let data: object[] = Pagination(req, items);
    let results = {
      page: Number(page),
      pageDisplay: Number(pageDisplay),
      resultsCount: data.length,
      items: data,
      filters: {
        bodyPart: req.query.bodyPart,
        equipment: req.query.equipment,
        target: req.query.target,
      },
    };
    await writeData("exercises", JSON.stringify(results));
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json(error);
  }
};
// GET - All Body Parts
const GetAllBodyParts = async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .json([
        "back",
        "cardio",
        "chest",
        "lower arms",
        "lower legs",
        "neck",
        "shoulders",
        "upper arms",
        "upper legs",
        "waist",
      ]);
  } catch (error) {
    res.status(400).json(error);
  }
};
// GET - Single Body Part
const GetSingleBodyPart = async (req: Request, res: Response) => {
  const name = req.params.name;
  const page = req.query.page;
  const pageDisplay = req.query.limit;

  try {
    const data = await WorkoutsProxy("get", `/exercises/bodyPart/${name}`);

    if (page === undefined || pageDisplay === undefined) {
      res.status(400).json({ error: "Page Number or Page Limit Missing" });
    }

    let results = {
      page: Number(page),
      pageDisplay: Number(pageDisplay),
      items: data,
    };
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json(error);
  }
};
// GET- Muscle Group
const GetAllMuscleGroup = async (req: Request, res: Response) => {
  try {
    res.json([
      "abductors",
      "abs",
      "adductors",
      "biceps",
      "calves",
      "cardiovascular system",
      "delts",
      "forearms",
      "glutes",
      "hamstrings",
      "lats",
      "levator scapulae",
      "pectorals",
      "quads",
      "serratus anterior",
      "spine",
      "traps",
      "triceps",
      "upper back",
    ]);
  } catch (error) {
    res.status(400).json(error);
  }
};

// GET - Muscle Single Group
const GetSingleMuscleGroup = async (req: Request, res: Response) => {
  const name = req.params.name;
  try {
    const data = await WorkoutsProxy("get", `exercises/target/${name}`);
    let results = {
      page: Number(req.query.page),
      pageDisplay: Number(req.query.limit),
      items: Pagination(req, data),
    };
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json(error);
  }
};

// GET - All Equipment
const GetAllEquipment = async (req: Request, res: Response) => {
  try {
    res.json([
      "assisted",
      "band",
      "barbell",
      "body weight",
      "bosu ball",
      "cable",
      "dumbbell",
      "elliptical machine",
      "ez barbell",
      "hammer",
      "kettlebell",
      "leverage machine",
      "medicine ball",
      "olympic barbell",
      "resistance band",
      "roller",
      "rope",
      "skierg machine",
      "sled machine",
      "smith machine",
      "stability ball",
      "stationary bike",
      "stepmill machine",
      "tire",
      "trap bar",
      "upper body ergometer",
      "weighted",
      "wheel roller",
    ]);
  } catch (error) {
    res.status(400).json(error);
  }
};

const GetSingleEquipment = async (req: Request, res: Response) => {
  const name = req.params.name;
  try {
    const data = await WorkoutsProxy("get", `exercises/equipment/${name}`);
    let results = {
      page: Number(req.query.page),
      pageDisplay: Number(req.query.limit),
      items: Pagination(req, data),
    };
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json(error);
  }
};
// GET - Get By Name
const GetByName = async (req: Request, res: Response) => {
  const name = req.params.name;
  try {
    const data = await WorkoutsProxy("get", `exercises/name/${name}`);
    let results = {
      page: Number(req.query.page),
      pageDisplay: Number(req.query.limit),
      items: Pagination(req, data),
    };
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json(error);
  }
};
//  ***Muscle Group***
// Available Muscle Groups
const GetMuscleGroup = async (req: Request, res: Response) => {
  try {
    const data = await MuscleGroupProxy("get", "exercises/getMuscleGroups");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
// Available Muscle Groups
const GetImages = async (req: Request, res: Response) => {
  try {
    const data = await MuscleImageGenerator("get", `getImage`, {
      muscleGroups: "biceps,chest,hamstring",
      color: "200,100,80",
      transparentBackground: "0",
    });
    console.log("data->", data);
    res.type("image/png");
    res.send(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Routines
const createWorkout = async (req: Request, res: Response) => {
  const {
    name,
    gifUrl,
    id,
    equipment,
    muscle_target,
    secondaryMuscles,
    bodyPart,
    routineId,
    sets,
    restTime,
  } = req.body;

  try {
    if (req.params.id === undefined) {
      return res.status(400).json({ message: "No Regiment provided" });
    }
    if (routineId === undefined || routineId === null) {
      return res.status(400).json({ message: "No routines id provided" });
    }

    const results = await Regiment.findById(req.params.id);
    if (!results) {
      return res.status(404).json({ message: "No Regiment Id found" });
    }
    results.routines.filter(
      (routine) => routine._id?.toString() === routineId
    )[0];
    if (
      results.routines.filter(
        (routine) => routine._id?.toString() === routineId
      ).length === 0
    ) {
      return res.status(404).json({ message: "No Routines found" });
    }

    if (
      results.routines
        .filter((routine) => routine._id?.toString() === routineId)[0]
        .workouts.filter((val) => val.id === id).length >= 1
    ) {
      return res.status(400).json({ message: `${name} already exist` });
    }
    // Create Workout
    const workout = results.routines.filter(
      (routine) => routine._id?.toString() === routineId
    )[0];

    workout.workouts.push({
      name,
      equipment,
      muscle_target,
      gifUrl,
      bodyPart,
      id,
      sets: [sets],
    });

    // Add primary and secondary muscle groups

    workout.primaryMuscleGroup.push(muscle_target);
    secondaryMuscles.map((val: string) =>
      workout.secondaryMuscleGroup.push(val)
    );

    workout.primaryMuscleGroup = [...new Set(workout.primaryMuscleGroup)];
    workout.secondaryMuscleGroup = [...new Set(workout.secondaryMuscleGroup)];

    // handle results
    results.save().then((response) => {
      res.status(200).json({
        res: results,
        message: `Success! workout ${name} has been added!`,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

// Update
const updateWorkout = async (req: Request, res: Response) => {
  const { routineId, workoutId, sets, restTime } = req.body;
  const regimentId = req.params.id;
  if (regimentId === undefined || workoutId === null || routineId === null) {
    return res.status(400).json({ message: "missing ids" });
  }

  const results = await Regiment.findById(regimentId);

  let filterExercises = results!.routines
    .filter((value) => value._id == routineId)[0]
    .workouts.filter((value) => value._id == workoutId)[0];

  if (filterExercises === undefined) {
    return res.status(400).json({ message: "workout not found" });
  }
  console.log(req.body, filterExercises);
  filterExercises!.sets = [sets];
  filterExercises!.restTime = restTime;

  results?.save();

  return res.status(200).json({ message: "workout updated" });
};
const deleteWorkout = async (req: Request, res: Response) => {
  const regimentId = req.params.id;
  const { id, routineId } = req.body;
  console.log("req.", req.body);

  // regiment id
  if (regimentId === undefined || id === undefined || routineId === undefined) {
    return res.status(400).json({ message: "missing ids" });
  }
  console.log(id);
  try {
    const results = await Regiment.findById({ _id: regimentId });

    let filterExercises: any = results?.routines
      .filter((value) => value._id == routineId)[0]
      .workouts.filter((value) => value.id !== id);

    results!.routines.filter((value) => value._id == routineId)[0].workouts =
      filterExercises;

    results?.save();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAllWorkouts = async (req: Request, res: Response) => {
  const regimentID = req.params.id;
  if (regimentID === undefined) {
    return res.status(400).json({ message: "No Regiment Id" });
  }
  try {
    const workouts = await Regiment.findById(req.params.id);
    return res.json(workouts);
  } catch (error) {
    res.status(400).json(error);
  }
};
const getSingleWorkout = async (req: Request, res: Response) => {
  const { regimentID, workoutID } = req.body;
  try {
    const response = await Regiment.findById(
      req.params.id,
      (err: any, results: any) => {
        if (!results) {
          return res.status(404).json({ message: "No Regiment ID found" });
        }
        res
          .status(200)
          .json(results.routines.id(regimentID).workout(workoutID));
      }
    );

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export default {
  GetAllExercises,
  GetAllBodyParts,
  GetSingleBodyPart,
  GetAllMuscleGroup,
  GetSingleMuscleGroup,
  GetSingleEquipment,
  GetAllEquipment,
  GetByName,
  GetMuscleGroup,
  GetImages,
  createWorkout,
  updateWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
};
