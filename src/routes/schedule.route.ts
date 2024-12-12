import express from "express";
import {createSchedule, getSchedules, getTrainerSchedules} from "../controllers/scheduleController";
import {authenticate} from "../middlewares/authenticate";

export const scheduleRoute = express.Router();

scheduleRoute.post("/create-schedule",authenticate,createSchedule);
scheduleRoute.get("/get-schedule",getSchedules);
scheduleRoute.get("/get-schedule-trainer",authenticate,getTrainerSchedules);