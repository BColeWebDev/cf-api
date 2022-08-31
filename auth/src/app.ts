import { errorHandler } from './middleware/errorMiddleware';
import express from "express"
import authRoutes from "./routes/auth"
import cors from "cors"
import dotenv from "dotenv"
// Enviorment Variables
if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

const app = express()
// Middleware
app.set('trust proxy', true)
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use("/api/v1/auth", authRoutes)


app.all('*', async (req, res) => {
    res.send("Not Found")
})
app.use(errorHandler);

export {app}