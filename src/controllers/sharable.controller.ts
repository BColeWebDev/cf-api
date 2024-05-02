import { Regiment } from "../models/regiment.model";
import { Nutritions } from "../models/nutritions.model";
import { Sharable } from "../models/sharable.model";
import { Response, Request } from "express";
import { User } from "../models/user.model";

// Sharable Controllers
const getAllSharable = async (req: Request, res: Response) => {
  const response = await Sharable.find({});

  return res.status(200).json(response);
};
// Create Sharable Workout Regiment
const createSharable = async (req: Request, res: Response) => {
  if (req.body.regiment_id === undefined) {
    return res.status(400).json({ message: "Regiment ID required." });
  }
  let existingRegiment = await Regiment.findById(req.body.regiment_id);
  if (existingRegiment === null) {
    return res.status(400).json({ message: "Regiment ID not found." });
  }
  if (existingRegiment.sharables) {
    return res.status(400).json({ message: "Already Shared!" });
  }
  const existingUser = await User.findById(req.body.created_by);
  if (existingUser === null) {
    return res.status(400).json({ message: "User id not found" });
  }

  try {
    const results = await Sharable.build({
      sharable_name: req.body.sharable_name,
      created_by: req.body.created_by,
      downloads: 0,
      likes: 0,
      regiment_difficulty: req.body.regiment_difficulty,
      regiment_id: existingRegiment._id,
      comments: [],
      nutrition_id: "",
    });
    existingRegiment.sharables = true;
    existingRegiment.save();
    results.save();
    return res.status(201).json({ message: "Created new sharable!" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Delete Sharable
const deleteSharable = async (req: Request, res: Response) => {};

// Like and Download
const likeSharable = async (req: Request, res: Response) => {};
const downloadSharable = async (req: Request, res: Response) => {};

export default {
  getAllSharable,
  createSharable,
  deleteSharable,
  likeSharable,
  downloadSharable,
};
