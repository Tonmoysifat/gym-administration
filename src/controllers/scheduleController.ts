import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import { ISchedule, Schedule } from "../models/schedule.model";

export const createSchedule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { date, startTime, endTime, trainerId } = req.body;
        const user = req.headers;

        if (user.role !== "Admin") {
            res.status(403).json(
                { "success": false,
                    "message": "Unauthorized access.",
                    "errorDetails": "You must be an admin to perform this action." });
            return;
        }

        const trainer: any = await User.findById(trainerId);
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

        const trainerSchedules: any = await Schedule.find({ trainer: trainerId, date: scheduleDate });

        if (trainerSchedules.length >= 5) {
            res.status(400).json({ success: false, message: "Trainer schedule limit exceeded for the day" });
            return;
        }

        const schedule: ISchedule = await Schedule.create({
            date: scheduleDate,
            startTime,
            endTime,
            trainer: trainerId,
        });

        res.status(201).json({ success: true, message: "Schedule created successfully", data: schedule });
    } catch (error) {
        next(error);
    }
};

export const getSchedules = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const schedules = await Schedule.find()
            .populate("trainer", "name email")
            .populate("trainees", "name email");
        res.status(200).json({ success: true, message: "Schedules fetched successfully", data: schedules });
    } catch (error) {
        next(error);
    }
};

export const getTrainerSchedules = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const trainerId = req.headers.id;
        const user:any = await User.findById(trainerId);

        if (!user || user.role !== "Trainer") {
            res.status(403).json({ success: false, message: "Only trainers can view their schedules" });
            return;
        }

        const schedules = await Schedule.find({ trainer: trainerId })
            .populate("trainees", "name email")
            .sort({ date: 1, startTime: 1 });

        res.status(200).json({
            success: true,
            message: "Schedules fetched successfully",
            data: schedules,
        });
    } catch (error) {
        next(error);
    }
};
