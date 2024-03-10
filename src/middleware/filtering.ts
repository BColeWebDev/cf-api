// Filters Collections for multi selections
const Filtering = (req: any, results: any[]) => {
  try {
    // obj query contains params for page and item display
    if (Object.keys(req.query).length < 2) {
      return results;
    }

    let BodyPart =
      req.query.bodyPart !== undefined ? req.query.bodyPart.split(",") : [];
    let Equipment =
      req.query.equipment !== undefined ? req.query.equipment.split(",") : [];
    let Target =
      req.query.target !== undefined ? req.query.target.split(",") : [];

    return results!.filter((value) => {
      if (BodyPart.includes(value.bodyPart)) {
        return value;
      } else if (Equipment.includes(value.equipment)) {
        return value;
      } else if (Target.includes(value.target)) {
        return value;
      }
    });
  } catch (error) {
    console.log(error);
  }
};
export default Filtering;
