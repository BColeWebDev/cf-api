import mongoose from "mongoose"

console.log("env",process.env)

mongoose.connect(`${process.env.NODE_ENV !== 'development' ? process.env.MONGO_URL_TEST : process.env.MONGO_URL}`).then(()=>{
        console.log("Connected to Database!")
    }).catch((e) =>{
        console.error('Connection error', e.message);
    })
const db = mongoose.connection
export default db