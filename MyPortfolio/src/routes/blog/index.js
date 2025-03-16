import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";
import { uploadBlog } from "../../middleware/upload.js";

const app = e.Router();

app.post(
  "/",
  uploadBlog.single("image"),
  validator.createBlogValidator(),
  controller.validate,
  controller.createBlog
);

app.get("/", controller.getAllBlog);
app.get("/:id", controller.getSingleBlog);
app.delete("/:id", controller.removeBlog);
app.put(
  "/:id",
  uploadBlog.single("image"),
  validator.updateBlogValidator(),
  controller.validate,
  controller.updateBlog
);

export default app;
