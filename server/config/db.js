import mongoose from "mongoose";

const mongodbConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://magararjun2005_db_user:LdynxwUjkaxsTMrf@cluster0.af35nnw.mongodb.net/?appName=Cluster0"
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error in DB Connection", error);
  }
};

export default mongodbConnection;
