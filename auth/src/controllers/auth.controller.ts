import emailService, { verificationEmail,sendEmail, createResetPasswordEmail} from './../config/services/email.service';
import {setResetPasswordToken, saveUser,findUserById, setUserVerified, deleteUnverifiedUserByEmail} from '../config/services/user.service';
import {saveToken,findTokenBy} from '../config/services/token.service';
import{setUserId} from "../config/services/token.service"

import { generateToken, createToken } from '../config/jwt';
import { Response, Request } from "express"
import { User } from "../models/user.model"
import hashPassword from '../config/hash'
import dayjs from 'dayjs';

let error: string[] = [];

// Creates user and generates login token
const registerUser = async (req:Request, res:Response) =>{
    const{
        first_name, 
        last_name, 
        email, 
        password,
        bio,
        experience,
        crown_member,
        age,
        sex
    } = req.body

    // check to see if user already exist
    const userExist = await User.findOne({email});
    if(userExist){
        error.push( "email already exists!" )
        res.status(409).json({ errors: error.map(err => err)});
        error = []
    } else{
        
              // // Hashed Passwords
              const hashedPassword = await hashPassword.hash({rounds:10, password})
              // token
              const userToken = generateToken(email,first_name, last_name)
            
              
              // Create User 
              const newUser = User.build({
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
              await newUser.save();
                  // send user
                  if (newUser) {
                      // Creates verification email
                      const emailVerfication = verificationEmail(
                          newUser.email,
                          userToken
                          );
                      try {
                      await sendEmail(emailVerfication);
                          
                      // // Creates session cookie
                      // res.cookie("x-auth-token",userToken,{
                      //     maxAge: 15 * 60 * 1000,
                      //     expires: new Date(Date.now() + 15 * 60 * 1000),
                      //     secure: false,
                      //     httpOnly: true,
                      //     signed: true,
                      //     sameSite: 'strict'
                      // });    
      
                      return res.status(201).send({message:`A verification mail has been sent. ${newUser.first_name}`});           
                      } catch (error) {
                          console.log(error)
                      User.findByIdAndDelete(newUser._id)
                      return res
                             .status(403)
                             .send({message: `Impossible to send an email to ${newUser.email}, try again. Our service may be down.`});
                      }
                     
                  } else {
                      error.push( "Invalid user data" )
                      res.status(400).json({ errors: error.map(err => err) })
                      error= [];
                  }
    }
    
   
    
};

// Login User 
const loginUser = async (req:Request, res:Response) =>{
    const {email, password} = req.body
    // Checks for email
    try {
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
  
          res.status(200).json({id: existingUser.id,email: existingUser.email});
      }
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
};

// Sign Out User 
const SignOutUser = async (req:Request, res: Response) =>{
res.clearCookie("x-auth-cookie")
res.status(200).json({message:"Successfully Logged out"});
};

// Current User
const currentUser = async (req: Request, res: Response) =>{
    res.json({currentUser: req.currentUser || null});
};

// Login Reset
const loginReset = async (req:Request, res:Response) => {
    const{email}= req.body;
try {
    const user = await findUserById(email);
    if(!user)return res.status(404).send({message:"No user found with this email address." })
    const resetToken = createToken();    
    const tokenExpiryDate = dayjs().add(12,"hours").toDate();

    setUserId(resetToken, user.id);
    setResetPasswordToken(user, resetToken.token,tokenExpiryDate);
    await saveUser(user);
    await saveToken(resetToken);
    try {
        const email = createResetPasswordEmail(user.email, resetToken.token);
        await sendEmail(email);
        return res.status(200).send({message:"Password has been successfully changed."})
    } catch (error) {
        return res.status(503).send({message: `Impossible to send an email to ${user.email}, try again. Our service may be down.`});
    }

} catch (error) {
    return res.status(500).send({message:"An unexpected error occurred"});
}
};

// Forgot Password 
const forgotPassword = async (req:Request, res: Response) =>{
    const{email}=req.body
    try {
        const user = await User.findOne({email: email})
        if(!user) return res.status(404).send({message:"User not found with that email address!"});
        const resetToken = createToken();
        const tokenExpirationDate = dayjs().add(12,"hours").toDate();
        setUserId(resetToken,user?.id)
        setResetPasswordToken(user, resetToken.token, tokenExpirationDate)

        // Save user and token
        await saveUser(user);
        await saveToken(resetToken);

        try {
            // Creates email reset link
            const email = emailService.emailResetLink(user.email, resetToken.token)
            // sends email
            await emailService.sendEmail(email)
            return res
                     .status(200)
                     .send({ message: `A reset passowrd email has been sent to ${user.email}`})
        } catch (error) {
            return res
                     .status(503)
                     .send({message: `Impossible to send an email to ${email}, try again. Our service may be down.`});
        }
        
    } catch (error) {
        res
            .status(500)
            .send({message:"Error has occured"})
    }
};

// Reset User Password 
const resetPassword = async (req: Request, res: Response) =>{
    try {
        const token = await findTokenBy("token",req.params['token'])
        if(!token){
            return res.status(404).send({message:"This token is not valid. your token may have expired."});
        }
        const user = await findUserById(token._id);
        if(!user){
            return res.status(404).send({message:"We were unable to find a user for this token."})
        }
        if(user.passwordResetToken !== token.token){
            return res.status(400).send({
                message:
                  "User token and your token didn't match. You may have a more recent token in your mail list.",
              });
        }

        // Verify user token has expired

    } catch (error) {
          res
            .status(500)
            .send({message:"Error has occured"})
    }
};

// Send Confirmation 
const sendConfirmation = async (req:Request, res:Response) =>{
try {
    const token = await findTokenBy("token", req.params.token);
    if (!token) {
        return res.status(404).send({
          message: "We were unable to find a valid token. Your token may have expired.",
        });
      }

    const user = await findUserById(token._userId);

    if (!user) {
        return res.status(404).send({ message: `We were unable to find a user for this token.` });
    }
    if (user.isVerified) {
        return res
          .status(400)
          .send({ message: "This user has already been verified. Please log in." });
    }

    if (user.isVerified) {
        return res
          .status(400)
          .send({ message: "This user has already been verified. Please log in." });
    }
    setUserVerified(user);
    await saveUser(user);
    
} catch (error) {
    return res.status(500).send("An unexpected error occurred");
}
};

// User Cancel
const userCancel = async (req:Request, res:Response) =>{
   
   try {
       deleteUnverifiedUserByEmail(req.body.email);
        return res.status(200).send({message:"User reset success"});
   } catch (error) {
    return res.status(500).send("An unexpected error occurred");
   }

};



export default {
    registerUser,
    loginUser, 
    currentUser, 
    forgotPassword, 
    resetPassword,
    sendConfirmation,
    userCancel,
    loginReset,
    SignOutUser
}