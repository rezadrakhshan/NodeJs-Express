import parentController from "../controller.js";
import _ from "lodash";
import slugify from "slugify";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default new (class extends parentController {
  async createBlog(req, res) {
    const { title, content } = req.body;
    const userId = req.user.id;
    const slug = slugify(title, { lower: true });
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newBlog = new this.Blog({
      userId: userId,
      title: title,
      content: content,
      image: imagePath,
      slug: slug,
    });

    await newBlog.save();

    this.response({
      res,
      message: "Blog Created",
      data: newBlog,
    });
  }
  async removeBlog(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return this.response({ res, message: "Inavlid ID", code: 400 });
    }
    const result = await this.Blog.findByIdAndDelete(req.params.id);
    if (!result) {
      return this.response({ res, message: "Blog not found", code: 404 });
    }
    return this.response({ res, message: "Blog removed successfully" });
  }
  async getAllBlog(req, res) {
    const blog = await this.Blog.find({ userId: req.user.id });
    this.response({ res, data: blog });
  }
  async getSingleBlog(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return this.response({ res, message: "Inavlid ID", code: 400 });
    }
    const blog = await this.Blog.findById(req.params.id);
    if (!blog) {
      return this.response({ res, message: "Blog not found", code: 404 });
    }
    this.response({ res, data: blog });
  }
  async updateBlog(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return this.response({ res, message: "Inavlid ID", code: 400 });
    }
    const updateValue = _.pick(req.body, ["title", "content", "status"]);
    const blog = await this.Blog.findById(req.params.id);
    if (req.file) {
      updateValue.image = `/uploads/${req.file.filename}`;
      if (blog.image) {
        const oldImagePath = path.join(
          __dirname,
          "../../../public/blog",
          blog.image.split("/uploads/")[1]
        );
        fs.unlink(oldImagePath, (err) => {
          if (err && err.code !== "ENOENT") {
            console.error("Error deleting old image:", err);
          }
        });
      }
    }
    if (updateValue.title) {
      updateValue.slug = slugify(updateValue.title, { lower: true });
    }
    const result = await this.Blog.findByIdAndUpdate(
      req.params.id,
      updateValue,
      { new: true }
    );
    if (!result) {
      return this.response({ res, message: "Blog not found", code: 404 });
    }
    this.response({ res, message: "Blog updated successfully", data: result });
  }
})();
