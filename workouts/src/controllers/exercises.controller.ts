import needle from "needle"
import{NeedleHttpVerbs} from "needle"
let error: string[] = [];
import { Response, Request } from "express"
import Pagination from "../middleware/pagination";
import Sorting from "../middleware/sorting";
import { Regiment } from "../models/regiment.model";
// Call 3rd Party endpoint 

const Proxy = async(method:NeedleHttpVerbs, query: string) =>{
    const options = {
        "headers":{
            "x-rapidapi-host": `${process.env.API_HOST}`,
            "x-rapidapi-key": `${process.env.API_KEY}`
        }
    }
     const resData = await needle(`${method}`,`${process.env.API_URL}${query ? query : " "}`,options)
     const body = resData.body
     return body
}

// GET - All Excercises route 

const GetAllExercises = async (req:Request, res:Response) =>{
    try {
        const data = await Proxy('get', "")
        let results = {
            page:Number(req.query.page),
             pageDisplay:Number(req.query.limit), 
             items: Pagination(req,data)
            };    
       res.status(200).json(results)
    
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

// GET - All Body Parts
const GetAllBodyParts = async (req:Request, res:Response) =>{
    try {
        const data = await Proxy('get', "/bodyPartList")
        res.status(200).json(data)

    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
};
// GET - Single Body Part
const GetSingleBodyPart =  async (req:Request, res:Response) =>{
    const name = req.params.name
    try {
        const data = await Proxy('get', `/bodyPart/${name}`)
        let results = {
            page:Number(req.query.page),
             pageDisplay:Number(req.query.limit), 
             items: Pagination(req,data)
            };    
       res.status(200).json(results)
        
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}
const GetAllMuscleGroup = async (req:Request,res:Response) =>{
try {
    const data = await Proxy('get','/targetList')
    res.json(data);
} catch (error) {
    console.log(error);
    res.status(400).json(error)
}
};

const GetSingleMuscleGroup = async (req:Request,res:Response) => {
    const name = req.params.name
    try {
        const data = await Proxy('get', `/target/${name}`)
        let results = {
            page:Number(req.query.page),
             pageDisplay:Number(req.query.limit), 
             items: Pagination(req,data)
            };    
       res.status(200).json(results)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }

    
}

const GetAllEquipment = async  (req:Request,res:Response) =>{
    try {
        const data = await Proxy('get','/equipmentList');
        res.json(data)
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};

const GetSingleEquipment = async (req:Request,res:Response) =>{
    const name = req.params.name
try {
    const data = await Proxy('get', `/equipment/${name}`)
    let results = {
        page:Number(req.query.page),
         pageDisplay:Number(req.query.limit), 
         items: Pagination(req,data)
        };    
   res.status(200).json(results)
} catch (error) {
    console.log(error);
    res.status(400).json(error)
}
};

const GetByName = async (req:Request,res:Response) =>{
    const name = req.params.name
    try {
        const data = await Proxy('get', `/name/${name}`)
        let results = {
            page:Number(req.query.page),
             pageDisplay:Number(req.query.limit), 
             items: Pagination(req,data)
            };    
       res.status(200).json(results)

    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
    
}

// Routines
const createWorkout =async(req:Request,res:Response) =>{
    const{name,imageUrl,equipment,muscle_target,bodyPart,regimentID} = req.body
try {
    if(regimentID === undefined){
        return res.status(400).json({message:"no workoutid found"})
    }
    if(name === undefined || imageUrl === undefined || equipment === undefined || muscle_target === undefined ||bodyPart === undefined)
    {
        return res.status(400).json({message:"missing values"})
    }

    await Regiment.findById(req.params.id, (err:any,results:any) =>{
        if(!results){
            return  res.status(404).json({message:"No Regiment Id found"})
         }
        results?.routines.id(regimentID).workouts.push({name,equipment,muscle_target,imageUrl,bodyPart})
        results?.save()
        res.status(200).json({message:`Success! workout ${name} has been added!`})
    })
    

} catch (error) {
    res.status(400).json(error)
}
}
const updateWorkout =async(req:Request,res:Response) =>{
    try {
        const{name,imageUrl,equipment,muscle_target,bodyPart,regimentID, workoutID} = req.body
        if(regimentID === undefined || workoutID === undefined){
            return res.status(400).json({message:"Error! missing ids"})
        }
        Regiment.findOne({_id:req.params.id},(err:any, results:any)=>{
        if(!results){
            return  res.status(404).json({message:"No Regiment Id found"})
         }
        results.routines.id(regimentID).workouts.id(workoutID).name = name
        results.routines.id(regimentID).workouts.id(workoutID).equipment= equipment
        results.routines.id(regimentID).workouts.id(workoutID).muscle_target= muscle_target
        results.routines.id(regimentID).workouts.id(workoutID).bodyPart= bodyPart
        results.routines.id(regimentID).workouts.id(workoutID).imageUrl= imageUrl

         results?.save()
         
         res.status(200).json(results)
       })    
    } catch (error) {
        res.status(400).json({message:error})
    }
    
}
const getAllWorkouts =async(req:Request,res:Response) =>{
    const{regimentID} = req.body

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
    const{regimentID, workoutID} = req.body
    try {
        if(regimentID === undefined || workoutID === undefined){
            return res.status(400).json({message:"missing ids"})
        }
           Regiment.findOne({_id:req.params.id},(err:any,results:any) =>{
            if(!results){
               return  res.status(404).json({message:"No Regiment Id found"})
            }
            if(results.routines.id(regimentID).workouts.id(workoutID)){
                results.routines.id(regimentID).workouts.id(workoutID)?.remove()
                results.save()
                return res.status(200).json({message:results.routines.id(regimentID).workouts.id(workoutID)})
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
    createWorkout,
    updateWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout
}