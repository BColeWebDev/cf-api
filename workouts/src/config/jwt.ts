import {sign, verify,SignOptions,JwtPayload} from "jsonwebtoken";
const jwtSecret:any = process.env.JWT_SECRET;
// Verfiy JWT Token
export const decodeToken = (token:string) =>{
    try {
        return verify(token, jwtSecret)
    } catch (error) {
        return error
    }
}
