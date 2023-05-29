"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// import { errorHandler } from './middleware/errorMiddleware';
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const workout_route_1 = __importDefault(require("./routes/workout.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const dotenv_1 = __importDefault(require("dotenv"));
// Enviorment Variables
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config();
}
const limit = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const app = (0, express_1.default)();
exports.app = app;
// Middleware
app.set('trust proxy', true);
app.use(limit);
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use("/api/workouts", workout_route_1.default);
app.use("/api/auth", auth_route_1.default);
app.get('/api/auth/whoami', async (req, res) => {
    res.json({ message: "auth controller" });
});
app.get('/api/workouts/whoami', async (req, res) => {
    res.json({ message: "workouts controller" });
});
