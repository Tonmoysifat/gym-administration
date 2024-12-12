import mongoose, { Document, Schema, Types } from 'mongoose';
import {IUser} from "./user.model";
import {ISchedule} from "./schedule.model";

export interface IBooking extends Document {
    trainee: Types.ObjectId | IUser;
    schedule: Types.ObjectId | ISchedule;
}

const bookingSchema = new Schema<IBooking>({
    trainee: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    schedule: { type: Schema.Types.ObjectId, ref: 'Schedule', required: true },
});

export const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
