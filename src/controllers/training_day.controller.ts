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
  const response = await Regiment.find({ _id: req.params.id });

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
    if (req.body.index === undefined) {
      return res.status(400).json({ message: "missing index" });
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
        day: days[req.body.day],
        description: req.body.description,
        workouts: [],
      });

      response[0].days.push(days[req.body.day]);
      response[0].days = [...new Set(response[0].days)];

      // Creates new training days
      const newTrainingDay = await Regiment.updateOne(
        { _id: req.params.id },
        response[0]
      );
      if (newTrainingDay.acknowledged) {
        return res.status(200).json("New Training Day created!");
      }
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  };
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
  try {
    const response = await Regiment.findOne({ _id: req.params.id });

    // day already existing
    if (
      response?.routines?.filter(
        (value) => value?.day === days[Number(req.body.day)]
      )?.length === 1
    ) {
      return res.status(400).json({ error: "Day already exist" });
    }
    response!.routines[req.body.index].day = days[Number(req.body.day)];
    response!.routines[req.body.index].name =
      req.body.name ?? response?.routines[req.body.index].name;
    response!.routines[req.body.index].description =
      req.body.description ?? response?.routines[req.body.index].description;

    response!.days = response!.days.filter(
      (value) => value !== days[Number(req.body.day)]
    );
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
  try {
    if (req.params.id === undefined || req.body._id === undefined) {
      return res.status(400).json({ message: "No Regiment Id found" });
    }

    Regiment.findOne({ _id: req.params.id }, (err: any, results: any) => {
      if (!results) {
        res.status(404).json({ message: "No Regiment Id found" });
      } else {
        results.days = results.days.filter(
          (value: any) => value !== results.routines.id(req.body._id).day
        );
        results.routines.id(req.body._id)?.remove();
        results.save();
        res.status(200).json(results);
      }
    });
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};

const getAllTrainingDays = async (req: Request, res: Response) => {
  if (req.params.id === undefined) {
    res.status(400).json({ message: "No Regiment Id found" });
  }
  try {
    const response = await Regiment.findOne({ _id: req.params.id });

    res.status(200).json({ routines: response?.routines });
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};
export default {
  createTrainingDay,
  UpdateTrainingDay,
  getAllTrainingDays,
  findSingleTrainingDay,
  DeleteTrainingDay,
};
