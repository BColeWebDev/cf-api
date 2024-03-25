import express, { Request, Response } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import workoutRoutes from "./routes/workout.route";
import authRoutes from "./routes/auth.route";
import sharableRoutes from "./routes/sharable.route";
import dotenv from "dotenv";
import fs from "fs";
import ExpressMongoSanitize from "express-mongo-sanitize";
import isAuthenticated from "./middleware/authMiddleware";
// Enviorment Variables
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// Enviorment Variables
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// Rate Limiting
const limit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const app = express();
// Middleware
app.set("trust proxy", 1);
app.use(limit);
app.use(express.urlencoded({ extended: false }));
app.use(
  express.json({
    limit: "50mb",
  })
);
// Sanatize Data
app.use(ExpressMongoSanitize());
// Template Engine
app.set("view engine", "ejs");
app.use(cors({ origin: true, credentials: true }));
// Routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/auth", authRoutes);
app.use("api/sharables", sharableRoutes);

// Test Controllers
app.get("/api/auth/whoami", async (req: Request, res: Response) => {
  res.json({ message: "auth controller" });
});
app.get("/api/workouts/whoami", async (req: Request, res: Response) => {
  res.json({ message: "workouts controller" });
});

// Creates Upload Directory
if (!fs.existsSync("./src/uploads")) {
  fs.mkdirSync("./src/uploads");
}
app.all("*", async (req, res) => {
  res.status(404).send("Not Found");
});
// app.use(errorHandler);

export { app };
