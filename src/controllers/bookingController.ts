import { Request, Response, NextFunction } from 'express';
import { Schedule } from "../models/schedule.model";
import { Booking, IBooking } from "../models/booking.model";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";

export const bookClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { scheduleId, traineeId } = req.body;

        const schedule: any = await Schedule.findById(scheduleId);
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

        const booking = await Booking.create({ schedule: scheduleId, trainee: traineeId } as IBooking);
        schedule.trainees.push(traineeId);
        await schedule.save();

        res.status(201).json({ success: true,statusCode: 201,
            message: 'Class booked successfully', data: booking });
    } catch (error) {
        next(error);
    }
};

export const updateTraineeProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const traineeId = req.headers.id;
        const { name, password } = req.body;

        const trainee:any = await User.findById(traineeId);
        if (!trainee || trainee.role !== "Trainee") {
            res.status(403).json({ success: false, message: "Only trainees can update their profile" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        if (name) trainee.name = name;
        if (password) trainee.password = hashedPassword;
        await trainee.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: trainee,
        });
    } catch (error) {
        next(error);
    }
};
