import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongodbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error in DB Connection", error);
  }
};

export default mongodbConnection;
