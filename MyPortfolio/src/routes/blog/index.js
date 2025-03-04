import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";
import upload from "../../middleware/upload.js";

const app = e.Router();

app.get(
  "/",
  upload.single("image"),
  validator.createBlogValidator(),
  controller.validate,
  controller.createBlog
);

export default app;
