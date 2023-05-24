import {Request, Response, NextFunction} from 'express';
import { User } from '../models/user.model';
export const isAdmin = async (req: Request, res: Response, next: NextFunction) =>{
    const allUser = await User.findOne({_id: req.params.id})
    if(allUser?.isAdmin){
           return  next();
    }
  return res.status(401).json('Not Authorized')

}