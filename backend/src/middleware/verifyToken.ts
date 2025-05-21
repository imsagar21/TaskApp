import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  (async () => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized: No Token Provided" });
        return;
      }
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        res.status(401).json({ message: "Unauthorized: Invalid User" });
        return;
      }
      req.user = user;
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })();
};

export default verifyToken;
