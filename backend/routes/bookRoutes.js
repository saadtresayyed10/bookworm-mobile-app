import express from "express";
import {
  createBookController,
  getAllBooksController,
  deleteBookController,
} from "../controllers/bookController.js";

const router = express.Router();

router.post("/create/:userId", createBookController);
router.get("/all", getAllBooksController);
router.delete("/delete:id", deleteBookController);

export default router;
