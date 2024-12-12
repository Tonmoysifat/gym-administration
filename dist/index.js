"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hpp_1 = __importDefault(require("hpp"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_route_1 = require("./routes/auth.route");
const schedule_route_1 = require("./routes/schedule.route");
const booking_route_1 = require("./routes/booking-route");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Database Connection
const URL = "mongodb+srv://<username>:<password>@atlascluster.ufe1snn.mongodb.net/gynManagement";
const OPTION = { user: process.env.DB_USER, pass: process.env.DB_PASS, autoIndex: true };
mongoose_1.default.connect(URL, OPTION).then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.error("Database Connection Error:", err);
});
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, hpp_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb" }));
// Rate Limiter
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 3000,
});
app.use(limiter);
// Request Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
// Disable ETag
app.set("etag", false);
// Routes
app.use("/auth", auth_route_1.authRoute);
app.use("/schedule", schedule_route_1.scheduleRoute);
app.use("/booking", booking_route_1.BookingRoute);
// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err.stack);
    res.status(500).send('Something went wrong!');
});
// Server Listener
const PORT = 2084;
app.listen(PORT, () => {
    console.log(`Back-end is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map