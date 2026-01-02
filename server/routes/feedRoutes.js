import { getFeed, newsList } from "../controllers/feedController.js";
import express from "express";
import { chatWithNews } from "../controllers/newsChat.js";

const router = express.Router();

router.get("/getFeed", getFeed);
// router.get("/allNewsList", newsList);
router.post("/newsChat", chatWithNews);

export default router;
