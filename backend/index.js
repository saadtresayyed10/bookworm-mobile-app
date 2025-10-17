import express from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";

const PORT = process.env.PORT;

const app = express();

app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
