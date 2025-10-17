import express from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import { connectToDB } from "./lib/db.js";

const PORT = process.env.PORT;

const app = express();

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
  connectToDB();
});
