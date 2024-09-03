let error: string[] = [];
import { writeData } from "../db/redis";
import {
  NutritionInstantProxy,
  NutritionProxy,
} from "../config/services/nutrition.service";
import { Response, Request, json } from "express";
import { Nutritions } from "../models/nutritions.model";

//  Nutrition Data
const getAllNutrition = async (req: Request, res: Response) => {
  let items = await NutritionProxy("post", `${req.query.query}`);
  await writeData("nutritions", JSON.stringify(items));
  return res.status(200).json(items);
};

const instantNutritionSearch = async (req: Request, res: Response) => {
  let items = await NutritionInstantProxy("get", `${req.query.query}`);
  await writeData("nutritions-instant", JSON.stringify(items));
  return res.status(200).json(items);
};

// Creates New Nutrition Plan
const createNutrition = async (req: Request, res: Response) => {
  const newNutrition = await Nutritions.build({
    name: req.body.name,
  });
  newNutrition.save();

  return res.status(200).json({});
};

// Update existing nutrition
const updateNutrition = async (req: Request, res: Response) => {
  const { id } = req.params;

  const newNutrition = await Nutritions.findByIdAndUpdate(id, {
    name: req.body.name,
  });
  if (newNutrition !== null) {
    newNutrition.save();
  }

  return res.status(200).json({});
};
// delete existing nutririon
const deleteNutrition = async (req: Request, res: Response) => {
  const { id } = req.params;
  const newNutrition = await Nutritions.findByIdAndDelete(id);
  if (newNutrition !== null) {
    newNutrition.save();
  }

  return res.status(200).json({});
};
export default {
  getAllNutrition,
  createNutrition,
  updateNutrition,
  deleteNutrition,
  instantNutritionSearch,
};
