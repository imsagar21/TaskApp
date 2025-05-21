import { Schema, model, Document, Types } from "mongoose";

export interface TaskDocument extends Document {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate: Date;
  status: "active" | "completed";
  userId: Types.ObjectId;
}

const taskSchema = new Schema<TaskDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ["low", "medium", "high"], required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ["active", "completed"], default: "active" },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Task = model<TaskDocument>("Task", taskSchema);

export default Task;
