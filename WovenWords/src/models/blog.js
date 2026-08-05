import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  status: { type: Boolean, default: false },
  visits: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
  comments: { type: [mongoose.Schema.Types.ObjectId], ref: "Comment" },
  slug: { type: String, required: true },
}, { timestamps: true });


const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
