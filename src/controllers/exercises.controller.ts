import needle from "needle"
import{NeedleHttpVerbs} from "needle"
let error: string[] = [];
import { Response, Request, json } from "express"
import Pagination from "../middleware/pagination";
import Sorting from "../middleware/sorting";
import { RegiementDocument, Regiment } from "../models/regiment.model";
// Call 3rd Party endpoint 
import staticData from "./data"
import Filtering from "../middleware/filtering";
const WorkoutsProxy = async(method:NeedleHttpVerbs, query: string) =>{
    const options = {
        "headers":{
            "x-rapidapi-host": `${process.env.API_HOST_EXERCISES}`,
            "x-rapidapi-key": `${process.env.API_KEY_EXERCISES}`
        }
    }
    console.log("URL",`${process.env.API_URL_EXERCISES}${query ? query : ""}`)
     const resData = await needle(`${method}`,`${process.env.API_URL_EXERCISES}${query ? query : ""}`,options)
     const body = resData.body
     return body
}

const MuscleGroupProxy = async(method:NeedleHttpVerbs, query: string, params?:any) =>{
    const options = {
        "headers":{
            "x-rapidapi-host": `${process.env.API_HOST_EXERCISES}`,
            "x-rapidapi-key": `${process.env.API_KEY_EXERCISES}`
        },
    }
    try {
        const response = await needle(`${method}`,`${process.env.API_URL_EXERCISES}${query ? query :""}${params ? `?${params}` :""}`,options)
          
         return response.body
    } catch (error) {
       console.log(error)
    }
   
}

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

//    ***EXERCISES***
    // GET - All Excercises route 
const GetAllExercises = async (req:Request, res:Response) =>{

        const page = req.query.page
        const pageDisplay = req.query.limit 
        const sortation = req.query.sort
        const filters = req.query.filters
       
        if(page === undefined || pageDisplay === undefined){
            return res.status(400).json({error:"Page Number or Page Limit Missing"})
        }

        try {
 
            let items = await WorkoutsProxy('get',"/exercises");
           console.log("items",items)
            if(sortation !== undefined){
                items = Sorting(req, items)
            }
            if(filters !== undefined){
                items = Filtering(req,items);
            }
    
    

            // // Pagination Check  
            let data = Pagination(req,items);
            let results = {
                page:Number(page),
                pageDisplay:Number(pageDisplay), 
                items:  data
                };    
        res.status(200).json(items)
        
        } catch (error) {

            res.status(400).json(error)
        }
    };
    // GET - All Body Parts
const GetAllBodyParts = async (req:Request, res:Response) =>{
        try {
            const data = await WorkoutsProxy('get', "exercises/bodyPartList")
            res.status(200).json(data)

        } catch (error) {

            res.status(400).json(error)
        }
    };
    // GET - Single Body Part
const GetSingleBodyPart =  async (req:Request, res:Response) =>{
        const name = req.params.name
        const page = req.query.page
        const pageDisplay = req.query.limit 


        try {
            const data = await WorkoutsProxy('get', `/exercises/bodyPart/${name}`)


            if(page === undefined || pageDisplay === undefined){
                res.status(400).json({error:"Page Number or Page Limit Missing"})
        }


        let results = {
            page:Number(page),
            pageDisplay:Number(pageDisplay), 
            items:  data
            };    
        res.status(200).json(results)
            
        } catch (error) {

            res.status(400).json(error)
        }
    }
    // GET- Muscle Group 
const GetAllMuscleGroup = async (req:Request,res:Response) =>{
    try {
        const data = await WorkoutsProxy('get','exercises/targetList')
        res.json(data);
    } catch (error) {
        res.status(400).json(error)
    }
    };

    // GET - Muscle Single Group
const GetSingleMuscleGroup = async (req:Request,res:Response) => {
        const name = req.params.name
        try {
            const data = await WorkoutsProxy('get', `exercises/target/${name}`)
            let results = {
                page:Number(req.query.page),
                pageDisplay:Number(req.query.limit), 
                items: Pagination(req,data)
                };    
        res.status(200).json(results)
        } catch (error) {

            res.status(400).json(error)
        }

        
    }

    // GET - All Equipment
const GetAllEquipment = async  (req:Request,res:Response) =>{
        try {
            const data = await WorkoutsProxy('get','exercises/equipmentList');
            res.json(data)
        } catch (error) {

            res.status(400).json(error);
        }
    };

    const GetSingleEquipment = async (req:Request,res:Response) =>{
        const name = req.params.name
    try {
        const data = await WorkoutsProxy('get', `exercises/equipment/${name}`)
        let results = {
            page:Number(req.query.page),
            pageDisplay:Number(req.query.limit), 
            items: Pagination(req,data)
            };    
    res.status(200).json(results)
    } catch (error) {
        res.status(400).json(error)
    }
    };
    // GET - Get By Name
    const GetByName = async (req:Request,res:Response) =>{
        const name = req.params.name
        try {
            const data = await WorkoutsProxy('get', `exercises/name/${name}`)
            let results = {
                page:Number(req.query.page),
                pageDisplay:Number(req.query.limit), 
                items: Pagination(req,data)
                };    
        res.status(200).json(results)

        } catch (error) {

            res.status(400).json(error)
        }
        
    }
//  ***Muscle Group***
// Available Muscle Groups
    const GetMuscleGroup = async (req:Request,res:Response)=>{
        try {
            const data = await MuscleGroupProxy('get',"exercises/getMuscleGroups");
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json(error)
        }
    }   
// Available Muscle Groups
const GetImages= async (req:Request,res:Response)=>{     
    try {
        const data = await MuscleImageGenerator("get",`getImage`, {
            muscleGroups: 'biceps,chest,hamstring',
            color: '200,100,80',
            transparentBackground: '0'
          });
          console.log("data->",data)
          res.type('image/png')
        res.send(data);
    } catch (error) {
        res.status(400).json(error)
    }
}   

// Routines
const createWorkout =async(req:Request,res:Response) =>{
    const{name,gifUrl,id,equipment,muscle_target,bodyPart, day,routineId} = req.body
try {
    if(req.params.id === undefined){
        return res.status(400).json({message:"No Regiment found"})
    }
    if (routineId === undefined || routineId === null) {
      return res.status(400).json({ message: "No routines id found" });
    }

    // })
    const results = await Regiment.findById(req.params.id);
    if (!results) {
      return res.status(404).json({ message: "No Regiment Id found" });
    }
    results.routines.filter(
      (routine) => routine._id?.toString() === routineId
    )[0];

    if (
      results.routines
        .filter((routine) => routine._id?.toString() === routineId)[0]
        .workouts.filter((val) => val.id === id).length >= 1
    ) {
      return res.status(400).json({ message: `${name} already exist` });
    }
    // Create Workout
    results.routines
      .filter((routine) => routine._id?.toString() === routineId)[0]
      .workouts.push({ name, equipment, muscle_target, gifUrl, bodyPart, id });

    // handle results
    results?.save((err,results)=>{
        if(err){
            return res.status(500).json({err:`Server Err! could not create lead ${err}`})
        }
        res.status(200).json({
            res:results,
            message:`Success! workout ${name} has been added!`
        })

    })
    

} catch (error) {
    res.status(400).json(error)
}
}
const updateWorkout =async(req:Request,res:Response) =>{
    try {
        const{name,gifUrl,equipment,muscle_target,bodyPart,regimentId, workoutId} = req.body
        if(regimentId === undefined || workoutId === undefined){
            return res.status(400).json({message:"Error! missing ids"})
        }
        Regiment.findOne({_id:req.params.id},(err:any, results:any)=>{
        if(!results){
            return  res.status(404).json({message:"No Regiment Id found"})
         }
         if(err){
            return res.status(404).json({message:err})
         }
        results.routines.id(regimentId).workouts.id(workoutId).name = name
        results.routines.id(regimentId).workouts.id(workoutId).equipment= equipment
        results.routines.id(regimentId).workouts.id(workoutId).muscle_target= muscle_target
        results.routines.id(regimentId).workouts.id(workoutId).bodyPart= bodyPart
        results.routines.id(regimentId).workouts.id(workoutId).gifUrl= gifUrl

         results?.save()
         
         res.status(200).json({
            res:results,
            message:"Success! Updated workout."
         })
       })    
    } catch (error) {
        res.status(400).json({message:error})
    }
    
}
const getAllWorkouts =async(req:Request,res:Response) =>{
    const{regimentID} = req.body
    if(regimentID !== undefined){
        return res.status(400).json({message:"No Regiment Id "})
    }
    try {
        await Regiment.findById(req.params.id,(err:any,results:any) =>{
            if(!results){
                return  res.status(404).json({message:"No Regiment Id found"})
             }
            res.status(200).json({"workouts":
            results?.routines.id(regimentID).workouts})
        })
        
    } catch (error) {
        res.status(400).json(error)
    }
    
}
const getSingleWorkout =async(req:Request,res:Response) =>{
    const{regimentID,workoutID} = req.body
    try {
        const response  = await Regiment.findById(req.params.id,(err:any,results:any) =>{
            if(!results){
                return res.status(404).json({message:"No Regiment ID found"})
            }
            res.status(200).json(results.routines.id(regimentID).workout(workoutID))
        })
        
        res.status(200).json(response)
    
    } catch (error) {
        res.status(400).json(error)
    }
    
}
const deleteWorkout =async(req:Request,res:Response) =>{
    const{regimentId, workoutId} = req.body
    try {
        if(regimentId === undefined || workoutId === undefined){
            return res.status(400).json({message:"missing ids"})
        }
           Regiment.findOne({_id:req.params.id},(err:any,results:any) =>{
            if(!results){
               return  res.status(404).json({message:"No Regiment Id found"})
            }
            if(results.routines.id(regimentId).workouts.id(workoutId)){
                results.routines.id(regimentId).workouts.id(workoutId)?.remove()
                results.save()
                return res.status(200).json({message:results.routines.id(regimentId).workouts.id(workoutId)})
            }else{
                return  res.status(404).json({message:"workout ID not found!"})
            }
            })
               
    
    } catch (error) {
        res.status(400).json(error)
    }
    
}

export default {
    GetAllExercises,
    GetAllBodyParts,
    GetSingleBodyPart,
    GetAllMuscleGroup,
    GetSingleMuscleGroup,
    GetSingleEquipment,
    GetAllEquipment,
    GetByName,
    GetMuscleGroup,
    GetImages,
    createWorkout,
    updateWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout
}