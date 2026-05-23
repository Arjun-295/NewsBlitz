import {getBookmarks, toggleBookmark, deleteBookmark} from "../controllers/bookmark.controller.js"
import { authMiddleware } from "../controllers/auth.js";
import express from "express";

const router = express.Router();

router.get("/bookmarks", authMiddleware, getBookmarks);
router.post("/bookmarks/toggle", authMiddleware, toggleBookmark);
router.delete("/bookmarks/:id", authMiddleware, deleteBookmark);

export default router;