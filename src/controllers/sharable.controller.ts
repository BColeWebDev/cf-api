import { Sharable } from "../models/sharable.model";
import { Response, Request } from "express";

// Sharable Controllers
const getAllSharable = async (req: Request, res: Response) => {
  const response = await Sharable.find({});
  return res.status(200).json(response);
};
// Create Sharable
const createSharable = async (req: Request, res: Response) => {};

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
