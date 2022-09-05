
import { generateToken } from '../config/jwt';
import { Response, Request } from "express"
import { User } from "../models/user.model"
import hashPassword from '../config/hash'

let error: string[] = []

// Creates user and generates login token
const registerUser = async (req:Request, res:Response) =>{
    const{first_name, last_name, email, password, bio, experience, crown_member, age,sex} = req.body

    // check to see if user already exist
    const userExist = await User.findOne({email})
    if(userExist){
        error.push( "User already exists!" )
        res.status(409).json({ errors: error.map(err => err)})
        error = []
    }
    else{
         // // Hashed Passwords
        const hashedPassword = await hashPassword.hash({rounds:10, password})
        // token
        const userToken = generateToken(email,first_name, last_name)

        // Create User 
        const user = User.build({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            bio,
            experience,
            age,
            sex,
            crown_member
        })
        await user.save();

            // send user
            if (user) {
                // Creates session cookie
                res.cookie("x-auth-token",userToken,{
                    maxAge: 15 * 60 * 1000,
                    expires: new Date(Date.now() + 15 * 60 * 1000),
                    secure: false,
                    httpOnly: true,
                    signed: true,
                    sameSite: 'strict'
                });                
                res.status(201).json(user);
            } else {
                error.push( "Invalid user data" )
                res.status(400).json({ errors: error.map(err => err) })
                error= []
            }
    }
}
// Login user 
const loginUser = async (req:Request, res:Response) =>{
    const {email, password} = req.body
    // Checks for email
    const existingUser = await User.findOne({email: email})
    if(!existingUser || !(await hashPassword.compare(password,existingUser.password))){
          error.push( "Invalid Credentials email or password is incorrect" )
        res.status(400).json({ errors: error.map(err => err) })
        error= []
    }else{
        const userToken  = generateToken(existingUser.email, existingUser.first_name, existingUser.last_name)

        res.cookie('x-auth-token', userToken, {
            maxAge: 15 * 60 * 1000,
            expires: new Date(Date.now() + 15 * 60 * 1000),
            secure: false,
            httpOnly: true,
            signed: true,
            sameSite: 'strict'
          });

        res.status(200).json(
            {
            id: existingUser.id,
            email: existingUser.email,
            }
         );
    }
}

export default {registerUser, loginUser}