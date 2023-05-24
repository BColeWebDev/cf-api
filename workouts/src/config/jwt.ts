import {verify} from "jsonwebtoken";



// Verfiy JWT Token
export const decodeToken = (token:string) =>{
    try {
        const jwtSecret = process.env.JWT_SECRET;

        console.log("jwt",jwtSecret)
        return verify(token, jwtSecret as string)
    } catch (error) {
        return error
    }
}
