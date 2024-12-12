import mongoose, { Document, Schema, Types } from 'mongoose';
import {IUser} from "./user.model";
export interface ISchedule extends Document {
    date: Date;
    startTime: string;
    endTime: string;
    trainer: Types.ObjectId | IUser;
    trainees: Types.ObjectId[] | IUser[];
}

const scheduleSchema = new Schema<ISchedule>({
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    trainer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    trainees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export const Schedule = mongoose.model<ISchedule>('Schedule', scheduleSchema);
