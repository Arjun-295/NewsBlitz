import mongoose from "mongoose";

const bookmarkSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  url: { type: String, required: true },
  urlToImage: { type: String },
  source: { type: String },
}, { timestamps: true });

export default mongoose.model("Bookmark", bookmarkSchema);
