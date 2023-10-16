// Workout Plans 
import { Response, Request } from "express";
import { Regiment } from "../models/regiment.model";
import mongoose from "mongoose";
import validation from "../config/validation";



const CreateRegimentPlan =  async (req:Request,res:Response) =>{
    const {name,description,userid} =req.body
 
try {
    if(name === undefined || description === undefined || userid === undefined){
        return res.status(400).send('missing values')
    }
    
    if(await Regiment.find({name:name})){
        return res.status(400).json({error:"Regiment Already exist"})
    }
    const response = validation.registerValidation(req.body)
    if(response.error!.details!.length >= 1){
        return res.status(400).json({error:response.error!.details})
    }
    const newRegiment = await Regiment.build({name,description,userid, routines:[], isCompleted:false});
    newRegiment.save()
    return res.json(newRegiment);
} catch (error) {
 
    res.status(400).json(error)
}
};
// PUT - Update workout Plans (Regiment ID)
const UpdateRegimentPlan =  async (req:Request,res:Response) =>{
const {name,description, isCompleted} = req.body

const response  = await Regiment.findByIdAndUpdate( req.params.id,{name,description,isCompleted})

return res.status(200).json(response)

};
// GET  - Get all Workout Plans (Regiment ID)
const GetAllRegimentPlan = async (req:Request,res:Response) =>{
    const{id} = req.params
try {
    const days =['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
    const regimentDays = []
    console.log("params",req.params.id)
    const allRegiments = await  Regiment.find({userid: id})
   
    return res.status(200).json(allRegiments)
} catch (error) {
    res.status(400).json(error)
}
};

// GET - Get Workout Plan (Regiment ID)
const GetSingleRegimentPlan = async (req:Request,res:Response) =>{
try {
    const singleWorkout = await Regiment.findById(req.params.id)
    return res.status(200).json(singleWorkout)
} catch (error) {
    res.status(400).json(error)
}
};




// DELETE - Delete Regiment plans (Training ID)
const DeleteRegimentPlan = async (req:Request,res:Response) =>{
    try {
        const deleteRegiment = await Regiment.findByIdAndDelete(req.params.id)
        return res.status(200).json(deleteRegiment)
    } catch (error) {
        res.status(400).json(error)
    }
};

export default {
    CreateRegimentPlan,
    UpdateRegimentPlan,
    GetAllRegimentPlan,
    GetSingleRegimentPlan,
    DeleteRegimentPlan
}