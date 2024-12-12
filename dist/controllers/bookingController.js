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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTraineeProfile = exports.bookClass = void 0;
const schedule_model_1 = require("../models/schedule.model");
const booking_model_1 = require("../models/booking.model");
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const bookClass = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { scheduleId, traineeId } = req.body;
        const schedule = yield schedule_model_1.Schedule.findById(scheduleId);
        if (!schedule) {
            res.status(404).json({ success: false, message: 'Schedule not found' });
            return;
        }
        if (schedule.trainees.length >= 10) {
            res.status(400).json({ "success": false,
                "message": "Class schedule is full. Maximum 10 trainees allowed per schedule."
            });
            return;
        }
        const booking = yield booking_model_1.Booking.create({ schedule: scheduleId, trainee: traineeId });
        schedule.trainees.push(traineeId);
        yield schedule.save();
        res.status(201).json({ success: true, statusCode: 201,
            message: 'Class booked successfully', data: booking });
    }
    catch (error) {
        next(error);
    }
});
exports.bookClass = bookClass;
const updateTraineeProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const traineeId = req.headers.id;
        const { name, password } = req.body;
        const trainee = yield user_model_1.User.findById(traineeId);
        if (!trainee || trainee.role !== "Trainee") {
            res.status(403).json({ success: false, message: "Only trainees can update their profile" });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        if (name)
            trainee.name = name;
        if (password)
            trainee.password = hashedPassword;
        yield trainee.save();
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: trainee,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateTraineeProfile = updateTraineeProfile;
