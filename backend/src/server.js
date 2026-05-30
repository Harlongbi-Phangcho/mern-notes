import express from "express";

import connectDB from "./config/db.js";
import dotenv from "dotenv";
import { rateLimiter } from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

//middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  );
}

app.use(express.json());
app.use(rateLimiter);

const __dirname = path.resolve();

// importing routes
import noteRoutes from "./routes/noteRoutes.js";

// declaring routes
app.use("/api/v1/notes", noteRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT: ", PORT);
  });
});
