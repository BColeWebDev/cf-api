export interface Register{
    first_name: string
    last_name:string
    email:string
    password: string
}
export interface Login{
    email:string
    password:string
}
export interface forgotPassword{
    email:string
}
export interface Regiment{
    name:string
    description:string
}
export interface Workouts{
    name:string
    id:string
    bodyPart:string
    gifUrl:string
    muscle_target:string
    equipment:string
}