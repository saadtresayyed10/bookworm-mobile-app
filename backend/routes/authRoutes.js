import express from "express";
import {
  getProfileController,
  loginUserController,
  registerUserController,
} from "../controllers/authControllers.js";
import protectRoute from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.get("/profile", protectRoute, getProfileController);

export default router;
