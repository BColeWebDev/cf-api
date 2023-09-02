import { decodeToken } from "../config/jwt";
import {Request, Response, NextFunction} from 'express';

// User authentication for routes 
const isAuthenticated = async  (req: Request, res: Response, next: NextFunction) => {
    const authHeader:any = req?.headers?.bearer
    const disabledAuth:boolean = process.env.CC_DISABLE_AUTH === "true"? true : false;
   
  
    // // verify token being sent from header 
    if ( authHeader === undefined && !disabledAuth) {
        return res.status(400).json('No token provided')
    }
    
    if(disabledAuth){
        return next()
    }

    // // // Get token from header
   if(authHeader !== undefined && !disabledAuth ){
    try {     
        // Verify token
        let decoder:any  = decodeToken(authHeader)
        if(decoder.message === "jwt expired"){
            return res.status(401).json(decoder.message)
        }
        next();
    } catch (error) {
        return res.status(401).json('Not Authorized')
    }
   }
 
}
export default isAuthenticated