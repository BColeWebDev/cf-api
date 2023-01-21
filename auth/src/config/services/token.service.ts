import  crypto  from 'crypto';
import { Token, TokenDocument } from "../../models/token.model";
import { Schema } from "mongoose";

// Creates user token
export const createToken =(): TokenDocument => new Token({token: crypto.randomBytes(16).toString("hex")})

//Finds token
export const findTokenBy = async(prop:string, value:string) => await Token.findOne({[prop]: value})

// setting user id
export const setUserId = (token: TokenDocument, userId: typeof Schema.Types.ObjectId): void => {
    token._userId = userId;
  };
  
export const saveToken = (token: TokenDocument) => token.save();
  
  export default {
    createToken,
    findTokenBy,
    setUserId,
    saveToken,
  };