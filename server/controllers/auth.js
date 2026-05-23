import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.json({
        success: false,
        message: "Email already Exists",
      });
    }
    const user = new User({
      name: fullName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "User is Registered Successfully",
    });
  } catch (error) {
    console.error("Error happened at registerUser", error);
    res.status(500).json({
      success: false,
      message: "Some error Occured while registering",
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      res.status(400).json({
        success: false,
        message: `Email doesn't exist`,
      });
      return;
    }

    const userPass = existingUser.password;
    if (!(await bcrypt.compare(password, userPass))) {
      res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
      return;
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        name: existingUser.name,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60min" },
    );

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
      token: token,
    });
  } catch (error) {
    console.error("Error occured", error);
    res.status(400).json({
      success: false,
      message: "Some Error Occured in login",
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Log out successfully",
  });
};

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");

    req.user = decoded; // 🔥 { id: user._id }

    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: "Invalide or Expired Token",
    });
  }
};

export const clerkSync = async (req, res) => {
  const { email, fullName, clerkId } = req.body;

  if (!email || !fullName) {
    return res.status(400).json({
      success: false,
      message: "Email and Full Name are required",
    });
  }

  try {
    let user = await User.findOne({ email: email });

    if (!user) {
      // Create user with a secure hashed version of clerkId as placeholder password
      const hashedPassword = await bcrypt.hash(clerkId || "clerk_" + email, 12);
      user = new User({
        name: fullName,
        email: email,
        password: hashedPassword,
      });
      await user.save();
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60min" }
    );

    res.status(200).json({
      success: true,
      message: "Clerk session synchronized successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    console.error("Error in clerkSync:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred while syncing Clerk session",
    });
  }
};

