import express from "express";
import {createSchedule, createTrainers, getSchedules, getTrainerSchedules} from "../controllers/scheduleController";
import {authenticate} from "../middlewares/authenticate";
import {validateInput} from "../utils/validation.util";

export const scheduleRoute = express.Router();

scheduleRoute.post("/create-schedule",authenticate,createSchedule);
scheduleRoute.post("/create-trainer",authenticate,validateInput(['name', 'email', 'password', 'role']), createTrainers);
scheduleRoute.get("/get-schedule",getSchedules);
scheduleRoute.get("/get-schedule-trainer",authenticate,getTrainerSchedules);