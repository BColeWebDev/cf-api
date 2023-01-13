import needle from "needle"
import{NeedleHttpVerbs} from "needle"
let error: string[] = [];
import { Response, Request } from "express"
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
        res.status(200).json(data)

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
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}
const GetSingleMuscleGroup = async (req:Request,res:Response) =>{
try {
    const data = await Proxy('get','/targetList')
    res.json(data);
} catch (error) {
    console.log(error);
    res.status(400).json(error)
}
};

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
    res.json(data)
} catch (error) {
    console.log(error);
    res.status(400).json(error)
}
};

const GetByName = async (req:Request,res:Response) =>{
    const name = req.params.name
    try {
        const data = await Proxy('get', `/name/${name}`)
        res.json(data)

    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
    
}


export default {
    GetAllExercises,
    GetAllBodyParts,
    GetSingleBodyPart,
    GetSingleMuscleGroup,
    GetSingleEquipment,
    GetAllEquipment,
    GetByName,
}