import { Request, Response } from "express";
import Task from "../models/Task";

interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
  };
}

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, description, priority, dueDate, status } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      priority,
      dueDate,
      status: status || "active",
      userId: (req as any).user?._id,
    });

    await newTask.save();

    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { priority, status, page = "1", limit = "5" } = req.query;

    const filter: any = { userId: (req as any).user?._id };

    if (priority) filter.priority = priority;
    if (status && status !== "all") {
      if (status === "pending") {
        filter.status = "active";
      } else if (status === "completed") {
        filter.status = "completed";
      }
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const tasks = await Task.find(filter)
      .sort({ dueDate: 1 })
      .skip(skip)
      .limit(parseInt(limit as string));

    const total = await Task.countDocuments(filter);

    res.status(200).json({ tasks, total });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const updated = await Task.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json({ message: "Task updated", task: updated });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const deleted = await Task.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
