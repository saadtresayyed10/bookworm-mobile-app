import express from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import { connectToDB } from "./lib/db.js";
import job from "./lib/cron.js";

const PORT = process.env.PORT;

job.start();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
  connectToDB();
});
