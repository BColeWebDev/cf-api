import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
// User authentication for routes 
const isValidUser = async  (req: Request, res: Response, next: NextFunction) => {
    const {userid} =req.body

    const user = await User.findById({_id:userid})
    if(user === null){
        return res.status(400).json("invalid user")
    }
    next();
}
export default isValidUser;