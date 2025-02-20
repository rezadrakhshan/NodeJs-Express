import Blog from "../models/blog.js";

export default async function countingVisits(req, res, next) {
  const blog = await Blog.findById(req.params.id);
  const isVisited = blog.visits.filter((element) => element == req.user.id);
  if (isVisited.length === 0) {
    blog.visits.push(req.user.id);
    await blog.save();
  }
  next();
}
