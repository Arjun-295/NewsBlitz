import express from "express";
import {
  createNote,
  deleteNotes,
  getAllNotes,
  getNoteById,
  pagination,
  updateNotes,
} from "../controllers/noteController.js";
import { authMiddleware } from "../controllers/auth.js";

const router = express.Router();

router.get("/pagination", authMiddleware, pagination);
router.post("/createNote", authMiddleware, createNote);
router.get("/getAllNotes", authMiddleware, getAllNotes);
router.get("/getNote/:id", authMiddleware, getNoteById);
router.patch("/updateNote/:id", authMiddleware, updateNotes);
router.delete("/deleteNote/:id", authMiddleware, deleteNotes);

export default router;
