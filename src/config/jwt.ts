import { Token,TokenDocument } from './../models/token.model';
import {sign, verify,SignOptions,JwtPayload} from "jsonwebtoken";
import crypto from "crypto"
/**
 * generates JWT used for local testing
 */

// Enviorment Variables
import dotenv from "dotenv";
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();

}

const jwtSecret:any = process.env.JWT_SECRET;

// Generates JWT User Token
export const generateToken  = (email:String, first_name:String, last_name:String) =>{
    // information to be encoded
    return sign({email, first_name,last_name}, jwtSecret,{
        expiresIn:"1hr"
    
    })
}

// Creates user token
export const createToken = (): TokenDocument =>
  new Token({
    token: crypto.randomBytes(16).toString("hex"),
  });

// Verfiy JWT Token
export const decodeToken = (token:string) =>{
    try {
        const res = verify(token, jwtSecret)
        return res
    } catch (error) {
        return error
    }
}


