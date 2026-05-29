import express from "express";

import connectDB from "./config/db.js";
import dotenv from "dotenv";
import { rateLimiter } from "./middleware/rateLimiter.js";
import cors from "cors"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

//middleware
app.use(cors({
  origin: "http://localhost:5173"
}))
app.use(express.json());
app.use(rateLimiter);


// importing routes
import noteRoutes from "./routes/noteRoutes.js";

// declaring routes
app.use("/api/v1/notes", noteRoutes);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT: ", PORT);
  });
});
