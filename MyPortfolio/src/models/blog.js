import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  is_published: { type: Boolean, default: false },
  createdAt: { type: String },
});

blogSchema.pre("save", function(next) {
  const gregorianDate = new Date();

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Tehran",
    calendar: "persian",
    numberingSystem: "arabext",
  };

  const persianDateString = gregorianDate.toLocaleString("fa-IR", options);
  this.createdAt = persianDateString;
  next();
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
