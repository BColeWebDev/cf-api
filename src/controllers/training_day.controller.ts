import { Response, Request } from "express";
import { Regiment } from "../models/regiment.model";

const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
const createTrainingDay = async (req: Request, res: Response) => {
  console.log("obj", req.body);
  if (req.params.id === undefined) {
    return res.status(400).json({ message: "No Regiment Id found" });
  }
  if (
    req.body.name === undefined ||
    req.body.description === undefined ||
    req.body.day === undefined
  ) {
    return res
      .status(400)
      .json({ message: "missing name / description / days" });
  }

  if (req.body.day < 0 || req.body.day > 6) {
    res.status(400).json("invalid entry");
  }
  try {
    const response = await Regiment.find({ _id: req.params.id });

    if (response.length === 0) {
      return res.status(400).json({ message: "no regiment found" });
    }
    // Day already created
    if (
      response[0].routines.filter((val) => val.day === days[req.body.day])
        .length > 0
    ) {
      return res
        .status(400)
        .json({ message: `${days[req.body.day]} already added` });
    }
    //  Creating new date
    response[0].routines.push({
      name: req.body.name,
      day: days[Number(req.body.day)],
      description: req.body.description,
      workouts: [],
      primaryMuscleGroup: [],
      secondaryMuscleGroup: [],
    });

    response[0].days.push(days[Number(req.body.day)]);
    response[0].days = [...new Set(response[0].days)];
    console.log("res", response[0]);
    // Creates new training days
    const newTrainingDay = await Regiment.updateOne(
      { _id: req.body.regimentId },
      response[0]
    );
    console.log("new", newTrainingDay);
    if (newTrainingDay.acknowledged) {
      return res.status(200).json("New Training Day created!");
    }
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

// Updates day, name and description
const UpdateTrainingDay = async (req: Request, res: Response) => {
  if (req.params.id === undefined) {
    res.status(400).json({ message: "No Regiment Id found" });
  }
  if (req.body.day < 0 || req.body.day > 6) {
    res.status(400).json("invalid entry");
  }
  if (
    req.body.name === undefined ||
    req.body.description === undefined ||
    req.body.day === undefined
  ) {
    return res
      .status(400)
      .json({ message: "missing name / description / days" });
  }
  if (req.body.index === undefined) {
    return res.status(400).json({ message: "missing index" });
  }

  let newDays: string[] = [];
  try {
    let response = await Regiment.findOne({ _id: req.params.id });
    if (response !== null) {
      response.routines[req.body.index].day = days[Number(req.body.day)];
      response.routines[req.body.index].name =
        req.body.name ?? response?.routines[req.body.index].name;
      response.routines[req.body.index].description =
        req.body.description ?? response?.routines[req.body.index].description;
      response?.routines.map((val) => {
        newDays.push(val.day);
      });
      response.days = newDays;
      response?.save();
    }

    return res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};
//
const findSingleTrainingDay = async (req: Request, res: Response) => {
  if (req.params.id === undefined) {
    res.status(400).json({ message: "No Regiment Id found" });
  }
  try {
    const response = await Regiment.findOne({ _id: req.params.id });
    return res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};
const DeleteTrainingDay = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    if (req.params.id === undefined) {
      return res.status(400).json({ message: "No Regiment Id found" });
    }
    await Regiment.findById(req.params.id).then((regiment) => {
      if (!regiment || regiment === null) {
        return res.status(404).json({ message: "No Regiment Id found" });
      }
      regiment.routines = regiment!.routines?.filter(
        (value) => value._id !== req.body.routineId
      );
      regiment!.days = regiment!.days?.filter(
        (value) => value !== req.body.trainingDay.day
      );
      console.log("newRes", regiment);
      regiment?.save();
      res.status(200).json(regiment);
    });
  } catch (error: any) {
    console.log("err", error);
    res.status(500).json(error.message);
  }
};

const getAllTrainingDays = async (req: Request, res: Response) => {
  if (req.params.id === undefined) {
    res.status(400).json({ message: "No Regiment Id found" });
  }
  try {
    const response = await Regiment.findOne({ _id: req.params.id });

    res
      .status(200)
      .json({ routines: response?.routines, days: response?.days });
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};

const trainingDayIsCompleted = async (req: Request, res: Response) => {
  if (req.params.id === null) {
    return res.status(400).json({ message: "Missing IDs" });
  }

  await Regiment.findById(req.params.id).then((value) => {
    if (value === null) {
      return res.status(404).json({ message: "regiment not found!" });
    }
    value.routines.filter(
      (value) => value._id == req.body.routineId
    )[0].isCompleted = true;
    value.save();

    return res.json({
      message: "workout completed",
    });
  });
};
export default {
  createTrainingDay,
  UpdateTrainingDay,
  getAllTrainingDays,
  findSingleTrainingDay,
  DeleteTrainingDay,
  trainingDayIsCompleted,
};
