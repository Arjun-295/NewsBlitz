import express from "express";
import mongodbConnection from "./config/db.js";
import { startCronJobs } from "./cron.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import feedRoutes from "./routes/feedRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";

const app = express();
const PORT = 5000;

mongodbConnection();
startCronJobs();
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello There");
});

app.use("/api/auth", authRoutes);
app.use("/api", feedRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api", bookmarkRoutes);

app.listen(PORT, () => {
  console.log(`Server runs on localhost:${PORT}`);
});
