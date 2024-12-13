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
let URL = "mongodb+srv://<username>:<password>@atlascluster.ufe1snn.mongodb.net/gynManagement";
let OPTION = { user: process.env.DB_USER, pass: process.env.DB_PASS, autoIndex: true };
mongoose_1.default.connect(URL, OPTION).then((res) => {
    console.log("Database Connected");
}).catch((err) => {
    console.log(err);
});
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, hpp_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb" }));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    limit: 3000,
});
app.use(limiter);
app.set("etag", false);
app.use("/auth", auth_route_1.authRoute);
app.use("/schedule", schedule_route_1.scheduleRoute);
app.use("/booking", booking_route_1.BookingRoute);
const PORT = 7094;
app.listen(PORT, function () {
    console.log(`back-end is running on http://localhost:${PORT}`);
});
