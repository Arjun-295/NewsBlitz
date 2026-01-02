import express from "express";
import mongodbConnection from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import feedRoutes from "./routes/feedRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";

const app = express();
const PORT = 5000;

mongodbConnection();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello There");
  console.log(req.baseUrl);
});

app.use("/api/auth", authRoutes);
app.use("/api", feedRoutes);
app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server runs on localhost:${PORT}`);
});
