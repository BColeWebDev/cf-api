import { Response, Request } from "express";

// Filters Collections for multi selections
const Filtering = (req: Request, results: any) => {
  try {
    console.log("filter", req.params);
    return results;
  } catch (error) {
    console.log(error);
  }
};
export default Filtering;
