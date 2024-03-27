import needle from "needle";
import { NeedleHttpVerbs } from "needle";
const WorkoutsProxy = async (method: NeedleHttpVerbs, query: string) => {
    const options = {
      headers: {
        "x-rapidapi-host": `${process.env.API_HOST_EXERCISES}`,
        "x-rapidapi-key": `${process.env.API_KEY_EXERCISES}`,
      },
    };
    console.log("URL", `${process.env.API_URL_EXERCISES}${query ? query : ""}`);
    const resData = await needle(
      `${method}`,
      `${process.env.API_URL_EXERCISES}${query ? query : ""}`,
      options
    );
    const body = resData.body;
    return body;
  };
  
  const MuscleGroupProxy = async (
    method: NeedleHttpVerbs,
    query: string,
    params?: any
  ) => {
    const options = {
      headers: {
        "x-rapidapi-host": `${process.env.API_HOST_EXERCISES}`,
        "x-rapidapi-key": `${process.env.API_KEY_EXERCISES}`,
      },
    };
    try {
      const response = await needle(
        `${method}`,
        `${process.env.API_URL_EXERCISES}${query ? query : ""}${
          params ? `?${params}` : ""
        }`,
        options
      );
  
      return response.body;
    } catch (error) {
      console.log(error);
    }
  };
  
  const MuscleImageGenerator = async (
    method: NeedleHttpVerbs,
    query: string,
    params: any
  ) => {
    const options = {
      headers: {
        "x-rapidapi-host": `${process.env.API_HOST_MUSCLE_GENERATOR}`,
        "x-rapidapi-key": `${process.env.API_KEY_MUSCLE_GENERATOR}`,
      },
      params: params,
    };
    try {
      const response = await needle(
        `${method}`,
        `${process.env.API_MUSCLE_GROUP}${query}`,
        options
      );
      console.log("response", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  export {
    MuscleGroupProxy,
    WorkoutsProxy,
    MuscleImageGenerator
  }