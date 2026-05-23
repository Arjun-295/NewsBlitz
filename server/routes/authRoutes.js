import express from "express";
import {
  registerUser,
  loginUser,
  authMiddleware,
  logout,
  clerkSync,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.post("/clerk-sync", clerkSync);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.json({
    success: true,
    message: "User is logged in",
    user: user,
  });
});

export default router;

