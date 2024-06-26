import { Schema } from "mongoose";
export interface Register {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface IUserToken {
  email: String;
  first_name: String;
  last_name: String;
  user_id: string;
}

export interface Login {
  email: string;
  password: string;
}
export interface forgotPassword {
  email: string;
}
export interface Regiment {
  name: string;
  description: string;
  userid: string;
}
export interface Workouts {
  name: string;
  id: string;
  bodyPart: string;
  gifUrl: string;
  muscle_target: string;
  equipment: string;
}
export interface ISets {
  sets: number;
  reps: number;
  weight: number;
}

export interface Nutritions{
  name:string
}
export interface Sharables{
  sharable_name:string;
  created_by:string;
  regiment_difficulty:string;
  

}