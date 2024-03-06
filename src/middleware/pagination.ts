import { Response, Request } from "express";
import Sorting from "./sorting";

const Pagination = (req: Request, data: any) => {

  const page: number = Number(req.query.page) ?? 1;
  const pageDisplay: number = Number(req.query.limit) ?? 100;
  const startIndex = (page - 1) * pageDisplay;
  const endIndex = page * pageDisplay;
  console.log("endIndex", endIndex);
  const results = data.slice(startIndex, endIndex);
  return results;
};

export default Pagination;
