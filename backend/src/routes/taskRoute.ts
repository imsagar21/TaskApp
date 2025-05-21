import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router = Router();

router.post("/create", verifyToken, createTask);
router.get("/get", verifyToken, getTasks);
router.put("/update/:id", verifyToken, updateTask);
router.delete("/delete/:id", verifyToken, deleteTask);

export default router;
