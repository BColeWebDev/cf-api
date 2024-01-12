import { Response, Request } from "express";

const Filtering = (req: Request, results: any) => {
  try {
    const OBJ: any = req.query.filters;
    let filters = JSON.parse(OBJ);
    return results.filter(function (item: any) {
      for (let key in filters) {
        if (
          item[key] === undefined ||
          item[key] != filters[key as keyof typeof filters]
        )
          return false;
      }
      return true;
    });
  } catch (error) {
    console.log(error);
  }
};
export default Filtering;
