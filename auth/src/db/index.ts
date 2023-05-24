import mongoose from "mongoose"

const link = `${process.env.NODE_ENV !== 'production' ? process.env.MONGO_URL_TEST : process.env.MONGO_URL}`;

mongoose.connect(link).then(()=>{
        console.log("Connected to Database!", link);
    }).catch((e) =>{
        console.error('Connection error', e.message);
    })
const db = mongoose.connection
export default db