"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoute = void 0;
const express_1 = __importDefault(require("express"));
const authenticate_1 = require("../middlewares/authenticate");
const bookingController_1 = require("../controllers/bookingController");
exports.BookingRoute = express_1.default.Router();
exports.BookingRoute.post("/book-schedule", authenticate_1.authenticate, bookingController_1.bookClass);
exports.BookingRoute.post("/update-trainee-profile", authenticate_1.authenticate, bookingController_1.updateTraineeProfile);
// scheduleRoute.get("/get-schedule",getSchedules);
