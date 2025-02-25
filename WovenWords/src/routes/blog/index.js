import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";
import upload from "../../middleware/upload.js";
import countingVisits from "../../middleware/blog.js";
import { isUserAdmin } from "../../middleware/user.js";

const router = e.Router();

router.post(
  "/",
  isUserAdmin,
  upload.single("image"),
  validator.createBlogValidator(),
  controller.validate,
  controller.createBlog
);

router.get("/", controller.getAllBlog);
router.get("/:id", countingVisits, controller.getSingleBlog);
router.delete("/:id", controller.removeBlog);

router.put(
  "/:id",
  upload.single("image"),
  validator.updateBlogValidator(),
  controller.validate,
  controller.updateBlog
);

export default router;
