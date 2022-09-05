import {sign, verify,SignOptions,JwtPayload} from "jsonwebtoken"

/**
 * generates JWT used for local testing
 */

// const jwtSecret: any = process.env.JWT_SECRET

// Generates JWT Token
export const generateToken  = (email:String, first_name:String, last_name:String) =>{
    // information to be encoded
    return sign({email, first_name,last_name}, "string",{
        expiresIn:"1hr"
    
    })
}

// Verfiy JWT Token
export const decodeToken = (token:string) =>{
    try {
        return verify(token, "string")
    } catch (error) {
        return error
    }
}


