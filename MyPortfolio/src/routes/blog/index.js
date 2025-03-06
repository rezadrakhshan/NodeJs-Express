import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";
import upload from "../../middleware/upload.js";

const app = e.Router();

app.post(
  "/",
  upload.single("image"),
  validator.createBlogValidator(),
  controller.validate,
  controller.createBlog
);

app.get("/", controller.getAllBlog);
app.get("/:id", controller.getSingleBlog);
app.delete("/:id", controller.removeBlog);

export default app;
