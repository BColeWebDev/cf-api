import mongoose from "mongoose";
console.log("url-test", process.env.MONGO_URL_TEST);
console.log("url", process.env.MONGO_URL);

mongoose
  .connect(`${process.env.MONGO_URL}`, {
    dbName: `${process.env.MONGO_DB_NAME}`,
    serverSelectionTimeoutMS: 5000,
  })
  .then((value) => {
    console.log("| MongoDB Connected ✅");
    console.log("|--------------------------------------------");
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });
const db = mongoose.connection;
export default db;
