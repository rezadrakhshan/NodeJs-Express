import parrentController from "../controller.js";
import _ from "lodash";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default new (class extends parrentController {
  async createBlog(req, res) {
    const data = _.pick(req.body, ["title", "content", "is_published"]);
    data.image = req.file ? `/blog/${req.file.filename}` : null;
    const newBlog = new this.Blog(data);

    await newBlog.save();

    this.response({
      res,
      message: "Blog Created",
      data: newBlog,
    });
  }
  async getAllBlog(req, res) {
    const blogs = await this.Blog.find({});
    return this.response({ res, message: "All blog is here", data: blogs });
  }

  async getSingleBlog(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return this.response({ res, message: "Inavlid ID", code: 400 });
    }
    const blog = await this.Blog.findById(req.params.id);
    if (!blog) {
      return this.response({ res, message: "Blog does not exists", code: 404 });
    }
    return this.response({ res, message: "Blog found", data: blog });
  }
  async removeBlog(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return this.response({ res, message: "Inavlid ID", code: 400 });
    }
    const blog = await this.Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return this.response({ res, message: "Blog does not exists", code: 404 });
    }
    return this.response({ res, message: "Blog removed" });
  }
  async updateBlog(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return this.response({ res, message: "Invalid ID", code: 400 });
    }
    const data = _.pick(req.body, ["title", "content", "is_published"]);
    const blog = await this.Blog.findById(req.params.id);
    if (!blog) {
      return this.response({ res, message: "Blog does not exists", code: 404 });
    }
    if (req.file) {
      data.image = `/blog/${req.file.filename}`;
      if (blog.image) {
        const oldImagePath = path.join(
          __dirname,
          "../../../public/blog",
          blog.image.split("/blog/")[1]
        );
        fs.unlink(oldImagePath, (err) => {
          if (err && err.code !== "ENOENT") {
            console.error("Error deleting old image:", err);
          }
        });
      }
    }
    const result = await this.Blog.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    return this.response({
      res,
      message: "Blog updated successfully",
      data: result,
    });
  }
})();
