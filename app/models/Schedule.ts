// models/Schedule.ts
import mongoose, { Schema, Document, models, model } from "mongoose";

interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

interface Category {
  id: number;
  name: string;
  duration: Time;
}

export interface ISchedule extends Document {
  userId: string;
  title: string;
  categories: Category[];
  duration: Time;
  createdAt: string;
}

const ScheduleSchema: Schema = new Schema<ISchedule>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  categories: { type: Array, required: true },
  duration: { type: Object, required: true },
  createdAt: { type: String, required: true },
});

// export const Schedule =
//   models.Schedule || model<ISchedule>("Schedule", ScheduleSchema);

export const Schedule = models.Schedule || model<ISchedule>("Schedule", ScheduleSchema);

