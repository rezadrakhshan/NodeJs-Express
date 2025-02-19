import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";
import upload from "../../middleware/upload.js";

const router = e.Router();

router.post(
  "/",
  upload.single("image"),
  validator.createBlogValidator(),
  controller.validate,
  controller.createBlog
);

router.get("/", controller.getAllBlog);
router.get("/:id", controller.getSingleBlog);
router.delete("/:id", controller.removeBlog);

export default router;
