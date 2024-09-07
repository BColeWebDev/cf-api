import needle, { NeedleHttpVerbs } from "needle";
const NutritionProxy = async (method: NeedleHttpVerbs, query: string) => {
  const options = {
    headers: {
      "x-app-id": `${process.env.API_KEY_ID_NUTRITION}`,
      "x-app-key": `${process.env.API_KEY_NUTRITION}`,
    },
  };

  const resData = await needle(
    method,
    `${process.env.API_HOST_NUTRITION}`,
    {
      query: query,
    },
    options
  );

  const body = resData.body;
  return body;
};
const NutritionInstantProxy = async (
  method: NeedleHttpVerbs,
  query: string
) => {
  const options = {
    headers: {
      "x-app-id": `${process.env.API_KEY_ID_NUTRITION}`,
      "x-app-key": `${process.env.API_KEY_NUTRITION}`,
    },
  };

  const resData = await needle(
    method,
    `${process.env.API_HOST_NUTRITION_INSTANT}`,
    {
      query: query,
    },
    options
  );
  const body = resData.body;
  return body;
};

export { NutritionProxy, NutritionInstantProxy };
