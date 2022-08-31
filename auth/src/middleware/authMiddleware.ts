import { decodeToken } from "../config/jwt";
import {Request, Response, NextFunction} from 'express';

// User authentication for routes 
const isAuthenticated = async  (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    // verify token being sent from header 
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json('No token provided')
    }

    // Get token from header
    let token = authHeader.split(' ')[1]
    try {
        // Verify token
        const decoder = decodeToken(token)
        // Get user from the token
        console.log(decoder)
        next()
    } catch (error) {
        return res.status(401).json('Not Authorized')
    }
}
export default {isAuthenticated}