import express from "express";
import {authenticate} from "../middlewares/authenticate";
import {bookClass, updateTraineeProfile} from "../controllers/bookingController";

export const BookingRoute = express.Router();

BookingRoute.post("/book-schedule",authenticate,bookClass);
BookingRoute.post("/update-trainee-profile",authenticate,updateTraineeProfile);
// scheduleRoute.get("/get-schedule",getSchedules);