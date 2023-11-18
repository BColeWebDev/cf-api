// Workout Plans
import { Response, Request } from "express";
import { Regiment } from "../models/regiment.model";
import validation from "../config/validation";

const CreateRegimentPlan = async (req: Request, res: Response) => {
  const { name, description, userid } = req.body;

  try {
    if (
      name === undefined ||
      description === undefined ||
      userid === undefined
    ) {
      return res.status(400).send("missing values");
    }
    let regiment = (await Regiment.find({ name: name })).length;
    if (regiment > 0) {
      return res.status(400).json({ error: "Regiment Already exist" });
    }
    const response = validation.createRegimentValidation(req.body);

    if (response.error! !== undefined) {
      console.log("response", response);
      return res.status(400).json({ error: response });
    }
    const newRegiment = await Regiment.build({
      name,
      description,
      userid,
      routines: [],
      isCompleted: false,
      days:[]
    });
    newRegiment.save();
    return res.json(newRegiment);
  } catch (error) {
    return res.status(500).json(error);
  }
};
// PUT - Update workout Plans (Regiment ID)
const UpdateRegimentPlan = async (req: Request, res: Response) => {
  const { name, description, isCompleted } = req.body;
    try {
        
    } catch (error) {
        return res.status(500).json(error);
    }
  const response = await Regiment.findByIdAndUpdate(req.params.id, {
    name,
    description,
    isCompleted,
  });
  response?.save()

  return res.status(200).json(response);
};
// GET  - Get all Regiment Plans (Regiment ID)
const GetAllRegimentPlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  if(id === undefined || id === null){
    return res.status(400).json({error:"No ID provided"})
  }
  try {
    console.log("params", req.params.id);
    const allRegiments = await Regiment.find({ userid: id });

    return res.status(200).json(allRegiments);
  } catch (error) {
    res.status(400).json(error);
  }
};

// GET - Get Workout Plan (Regiment ID)
const GetSingleRegimentPlan = async (req: Request, res: Response) => {
  try {
    const singleWorkout = await Regiment.findById(req.params.id);
    return res.status(200).json(singleWorkout);
  } catch (error) {
    res.status(400).json(error);
  }
};

// DELETE - Delete Regiment plans (Training ID)
const DeleteRegimentPlan = async (req: Request, res: Response) => {
  try {
    const deleteRegiment = await Regiment.findByIdAndDelete(req.params.id);
    return res.status(200).json(deleteRegiment);
  } catch (error) {
    res.status(400).json(error);
  }
};

export default {
  CreateRegimentPlan,
  UpdateRegimentPlan,
  GetAllRegimentPlan,
  GetSingleRegimentPlan,
  DeleteRegimentPlan,
};
