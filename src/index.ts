import express, { Request, Response, NextFunction } from 'express';
import hpp from "hpp";
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv';
import { authRoute } from "./routes/auth.route";
import { scheduleRoute } from "./routes/schedule.route";
import { BookingRoute } from "./routes/booking-route";

dotenv.config();
const app = express();

// Database Connection
const URL = "mongodb+srv://<username>:<password>@atlascluster.ufe1snn.mongodb.net/gynManagement";
const OPTION = { user: process.env.DB_USER, pass: process.env.DB_PASS, autoIndex: true };

mongoose.connect(URL, OPTION).then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.error("Database Connection Error:", err);
});

// Middleware
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(mongoSanitize());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3000,
});
app.use(limiter);

// Request Logging Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Disable ETag
app.set("etag", false);

// Routes
app.use("/auth", authRoute);
app.use("/schedule", scheduleRoute);
app.use("/booking", BookingRoute);

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Unhandled Error:", err.stack);
    res.status(500).send('Something went wrong!');
});

// Server Listener
const PORT = 2084;
app.listen(PORT, () => {
    console.log(`Back-end is running on http://localhost:${PORT}`);
});
