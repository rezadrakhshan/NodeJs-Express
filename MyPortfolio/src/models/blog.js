import mongoose from "mongoose";
import timestampsPlugin from "mongoose-timestamp";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  is_published: { type: Boolean, default: false },
});

blogSchema.plugin(timestampsPlugin);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
