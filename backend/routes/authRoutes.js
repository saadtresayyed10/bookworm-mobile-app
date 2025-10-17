import express from "express";
import { registerUserController } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", registerUserController);
// router.post("/login", registerUserController);

export default router;
