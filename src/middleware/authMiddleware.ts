import { decodeToken } from "../config/jwt";
import {Request, Response, NextFunction} from 'express';

// User authentication for routes 
const isAuthenticated = async  (req: Request, res: Response, next: NextFunction) => {
    const authHeader:string = req?.headers?.authorization!

    
    // verify token being sent from header 
    if ((!authHeader || !authHeader.startsWith('Bearer ')) && !process.env.CC_DISABLE_AUTH  ) {
        return res.status(400).json('No token provided')
    }
    if(process.env.CC_DISABLE_AUTH){
        next()
    }
    // Get token from header
    let token = authHeader?.split(' ')[1]
    try {
        
        // Verify token
        const decoder = decodeToken(token)
        // Get user from the token
        next()
    } catch (error) {
        return res.status(401).json('Not Authorized')
    }
}
export default isAuthenticated