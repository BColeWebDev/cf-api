import validation from "../config/validation";
import { Request, Response, NextFunction } from 'express';

// Validation of Register
const registerIsValid = async (req: Request, res:Response, next:NextFunction) => {

    // returns error if credentials are incorrect
    // goes to next middlware if correct

    const { error } = await validation.registerValidation(req.body)
    error === undefined ?
        next()
        :
        res.status(400).json({ errors: error.details.map(err => err.message) })


}


// Validation of Login

const loginIsValid = async (req: Request, res:Response, next:NextFunction)  => {
    const { error } = await validation.loginValidation(req.body)
    // returns error if credentials are incorrect
    // goes to next middlware if correct
    error === undefined ?
        next()
        :
        res.status(400).json({ errors: error.details.map(err => err.message) })
}

// Validation of Forgot Password
const forgotPassword = async (req:Request, res:Response, next:NextFunction) =>{
const{error} = await validation.forgotValidation(req.body)
error === undefined ?
next():
res.status(400).json({errors: error.details.map(err => err.message)})
};

const isValidWorkout = async (req:Request, res:Response, next:NextFunction) =>{
    const{error} = await validation.createWorkoutValidation(req.body)

error === undefined ?
next():
res.status(400).json({errors: error.details.map(err => err.message)})
}
const nutritionIsValid = async (req:Request,res:Response,next:NextFunction) =>{
    const{error} = await validation.createNutritionPlan(req.body)

error === undefined ?
next():
res.status(400).json({errors: error.details.map(err => err.message)})
}
export default {registerIsValid, loginIsValid, forgotPassword,isValidWorkout,nutritionIsValid}