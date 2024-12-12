"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrainerSchedules = exports.getSchedules = exports.createSchedule = void 0;
const user_model_1 = require("../models/user.model");
const schedule_model_1 = require("../models/schedule.model");
const createSchedule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, startTime, endTime, trainerId } = req.body;
        const user = req.headers;
        if (user.role !== "Admin") {
            res.status(403).json({ "success": false,
                "message": "Unauthorized access.",
                "errorDetails": "You must be an admin to perform this action." });
            return;
        }
        const trainer = yield user_model_1.User.findById(trainerId);
        if (!trainer || trainer.role !== "Trainer") {
            res.status(400).json({ success: false, message: "Invalid trainer ID or trainer role is not valid" });
            return;
        }
        const scheduleDate = new Date(date);
        const start = new Date(`${scheduleDate.toISOString().split("T")[0]}T${startTime}`);
        const end = new Date(`${scheduleDate.toISOString().split("T")[0]}T${endTime}`);
        if ((end.getTime() - start.getTime()) !== 2 * 60 * 60 * 1000) {
            res.status(400).json({ success: false, message: "Each class must last exactly 2 hours" });
            return;
        }
        const trainerSchedules = yield schedule_model_1.Schedule.find({ trainer: trainerId, date: scheduleDate });
        if (trainerSchedules.length >= 5) {
            res.status(400).json({ success: false, message: "Trainer schedule limit exceeded for the day" });
            return;
        }
        const schedule = yield schedule_model_1.Schedule.create({
            date: scheduleDate,
            startTime,
            endTime,
            trainer: trainerId,
        });
        res.status(201).json({ success: true, message: "Schedule created successfully", data: schedule });
    }
    catch (error) {
        next(error);
    }
});
exports.createSchedule = createSchedule;
const getSchedules = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedules = yield schedule_model_1.Schedule.find()
            .populate("trainer", "name email")
            .populate("trainees", "name email");
        res.status(200).json({ success: true, message: "Schedules fetched successfully", data: schedules });
    }
    catch (error) {
        next(error);
    }
});
exports.getSchedules = getSchedules;
const getTrainerSchedules = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainerId = req.headers.id;
        const user = yield user_model_1.User.findById(trainerId);
        if (!user || user.role !== "Trainer") {
            res.status(403).json({ success: false, message: "Only trainers can view their schedules" });
            return;
        }
        const schedules = yield schedule_model_1.Schedule.find({ trainer: trainerId })
            .populate("trainees", "name email")
            .sort({ date: 1, startTime: 1 });
        res.status(200).json({
            success: true,
            message: "Schedules fetched successfully",
            data: schedules,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getTrainerSchedules = getTrainerSchedules;
