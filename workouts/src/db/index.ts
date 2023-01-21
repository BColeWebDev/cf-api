import mongoose from "mongoose"



mongoose.connect(`${process.env.NODE_ENV !== 'production' ? process.env.MONGO_URL_TEST : process.env.MONGO_URL}`).then(()=>{
        console.log("Connected to Database!")
    }).catch((e) =>{
        console.error('Connection error', e.message);
    })
const db = mongoose.connection
export default db