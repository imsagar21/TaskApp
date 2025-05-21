import { Router } from "express";
import { signup, signin, checkAuth } from "../controllers/authController";
import verifyToken from "../middleware/verifyToken";

const router = Router();

router.post("/signUp", signup);
router.post("/login", signin);
router.get("/checkAuth", verifyToken, checkAuth);

export default router;
